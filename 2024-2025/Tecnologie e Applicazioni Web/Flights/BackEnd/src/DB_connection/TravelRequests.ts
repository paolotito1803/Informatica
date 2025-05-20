const result = require('dotenv').config()
if (result.error) {
    console.log("Unable to load \".env\" file. Please provide one to store the JWT secret key");
    process.exit(-1);
}
if( !process.env.JWT_SECRET ) {
    console.log("\".env\" file loaded but JWT_SECRET=<secret> key-value pair was not found");
    process.exit(-1);
}

import fs = require('fs');
import http = require('http');                  // HTTP module
import https = require('https');                // HTTPS module
import colors = require('colors');
colors.enabled = true;


import mongoose = require('mongoose');
import { Users } from '../DB_classes/Users';
import * as users from '../DB_classes/Users';

import {Routes} from '../DB_classes/Routes';
import * as routes from '../DB_classes/Routes';

import {Airlines} from '../DB_classes/Airlines';
import * as airlines from '../DB_classes/Airlines';

import {Aircrafts} from "../DB_classes/Aircrafts";
import * as aircrafts from '../DB_classes/Aircrafts';

import {Flights} from "../DB_classes/Flights";
import * as flights from '../DB_classes/Flights';

import {Seats} from "../DB_classes/Seats";
import * as seats from '../DB_classes/Seats';

import {Tickets} from "../DB_classes/Tickets";
import * as tickets from '../DB_classes/Tickets';

import {Airports} from "../DB_classes/Airports";
import * as airports from '../DB_classes/Airports';

import express = require('express');

import passport = require('passport');           // authentication middleware for Express
import passportHTTP = require('passport-http');  // implements Basic and Digest authentication for HTTP (used for /login endpoint)

import jsonwebtoken = require('jsonwebtoken');  // JWT generation
const { expressjwt: jwt } = require('express-jwt');            // JWT parsing middleware for express
import { DB_initialization } from "./DB_inizialization";

import cors = require('cors');                  // Enable CORS middleware
const io = require('socket.io');               // Socket.io websocket library
import { nextTick } from 'process';
export let app = express();
let auth = jwt( {
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
} );

app.use( cors() );

app.use( express.json( ) );

app.use( (req,res,next) => {
    console.log("------------------------------------------------".inverse)
    console.log("New request for: "+req.url );
    console.log("Method: "+req.method);
    next();
})

app.get("/", (req,res) => {
    res.status(200).json( { api_version: "1.0",
        endpoints: [
            "/users",
            "/airlines",
            "/login",
        ]
    } ); // json method sends a JSON response (setting the correct Content-Type) to the client
});

/*
Utenti -> users:
login -> get            FATTO
registrazione -> post   FATTO
delete -> del           FATTO
modifica dati -> put    FATTO
 */

passport.use( new passportHTTP.BasicStrategy(
    function(username, password, done) {
        console.log("New login attempt from ".green + username );
        users.getModel().findOne( {mail: username}).then( (user)=>{
            if( !user ) {
                return done(null,false,{statusCode: 500, error: true, errormessage:"Invalid user"});
            }
            if( user.validatePassword( password ) ) {
                return done(null, user);
            }
            return done(null,false,{statusCode: 500, error: true, errormessage:"Invalid password"});
        }).catch( ( err ) => {
            return done( {statusCode: 500, error: true, errormessage:err} );
        });
    }
));

app.get("/login", passport.authenticate('basic', { session: false }), (req,res,next) =>  {
    let tokendata = {
        username: req.user.username,
        roles: req.user.roles,
        mail: req.user.mail,
        id: req.user.id
    };
    console.log("Login granted. Generating token" );
    let token_signed = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, { expiresIn: '1h' } );
    return res.status(200).json({ error: false, errormessage: "", token: token_signed });
});

//signup user
app.post('/users', (req,res,next) => {
    let u = users.newUser( req.body );
    if( !req.body.password ) {
        return next({ statusCode:404, error: true, errormessage: "Password field missing"} );
    }
    u.setPassword( req.body.password );

    u.save().then( (data) => {
        return res.status(200).json({ error: false, errormessage: "", id: data._id });
    }).catch( (reason) => {
        if( reason.code === 11000 )
            return next({statusCode:404, error:true, errormessage: "User already exists"} );
        return next({ statusCode:404, error: true, errormessage: "DB error: "+reason.errmsg });
    })
});

//delete user
app.delete('/users/:id', auth, (req,res,next) => {
    if( !users.newUser(req.auth).hasAdminRole() ) {
        return next({ statusCode:404, error: true, errormessage: "Unauthorized: user is not an administrator."} );
    }
    users.getModel().deleteOne( {_id: req.params.id } )
        .then(
            ( q )=> {
                if( q.deletedCount > 0 )
                    return res.status(200).json( {error:false, errormessage:""} );
                else
                    return res.status(404).json( {error:true, errormessage:"Invalid user ID"} );
            }).catch( (reason)=> {
        return next({ statusCode:404, error: true, errormessage: "DB error: "+reason });
    })
});

// Add error handling middleware
app.use( function(err,req,res,next) {
    console.log("Request error: ".red + JSON.stringify(err) );
    res.status( err.statusCode || 500 ).json( err );
});

app.use( (req,res,next) => {
    res.status(404).json({statusCode:404, error:true, errormessage: "Invalid endpoint"} );
})

DB_initialization(app);

//user data modifications
/*
Into the profile page, the user may alter its data such as:
- password
- username
 */
app.put('/users/:id', auth, async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updateData: any = {};
        //Checks if both password and username are not empty fields
        if (!req.body.password &&
            !req.body.username &&
            !req.body.mail &&
            !req.body.passportID) {
            return next({ statusCode: 400, error: true, errormessage: "At least one field must be provided"});
        }
        //If the user wants to update password
        if (req.body.password) {
            updateData.setPassword(req.body.password); // Dovresti hashare la password prima di salvarla
        }
        //If the user wants to update username
        if (req.body.username) {
            updateData.username = req.body.username;
        }
        if(req.body.mail){
            updateData.mail=req.body.mail;
        }
        if(req.body.passportID) {
            updateData.passportID = req.body.passportID;
        }
        //Finds the user we want to update and do it
        const updatedUser = await users.getModel().findByIdAndUpdate(userId, updateData, { new: true })
            .then(
                () => {
                    return res.status(200).json(
                        { error: false,
                            errormessage: "",
                            id: updatedUser._id });
                }
            )
            .catch(() => {
                    return next(
                        { statusCode: 404,
                            error: true,
                            errormessage: "User not found."
                        });
                }
            );
    } catch (error) {
        console.error("Error updating user:", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});

/*
    Routes
    In this section we have to insert/update/delete the routes.
    Note: only an airline may insert a route!
    Steps:
    - insert -> POST    FATTO
    - update -> PUT     FATTO
    - delete -> DEL     FATTO
 */
app.post('/routes', auth, (req,res,next) => {
    let r = routes.newRoute(req.body);
    let a = users.newUser(req.auth).hasAirlineRole();
    if(a){
        r.save().then((data) => {
            return res.status(200).json({error: false, errormessage: "", id: data._id});
        }).catch( (reason) => {
            if (reason.code === 11000)
                return next({statusCode: 404, error: true, errormessage: "Route already exists"});
            return next({statusCode: 404, error: true, errormessage: "DB error: " + reason.errmsg});
        })
    }
    else
        console.error("Not admin, impossible insert");
});

app.put('/routes:id', async (req,res,next) => {
    try {
        const userId_routes = req.params.id;
        const updateData_routes: any = {};
        if (!req.body.depart &&
            !req.body.destination &&
            !req.body.layoverFuel) {
            return next({ statusCode: 400, error: true, errormessage: "At least one field must be provided"});
        }

        if(req.body.destination){
            updateData_routes.destination = req.body.destination;
        }
        if(req.body.depart){
            updateData_routes.department = req.body.depart;
        }
        if(req.body.layoverFuel){
            updateData_routes.layoverFuel = req.body.layoverFuel;
        }
        //Finds the routes we want to update and do it
        const updatedAirline = await airlines.getModel().findByIdAndUpdate(userId_routes, updateData_routes, { new: true })
            .then(
                () => {
                    return res.status(200).json(
                        { error: false,
                            errormessage: "",
                            id: updatedAirline._id });
                }
            )
            .catch(() => {
                    return next(
                        { statusCode: 404,
                            error: true,
                            errormessage: "Route not found."
                        });
                }
            );
    } catch (error) {
        console.error("Error updating user:", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});

app.delete('/routes:id', (req,res,next) => {
    if( !users.newUser(req.auth).hasAirlineRole() ) {
        return next({ statusCode:404, error: true, errormessage: "Unauthorized: user is not an administrator."} );
    }
    routes.getModel().deleteOne( {_id: req.params.id } )
        .then(
            ( q )=> {
                if( q.deletedCount > 0 )
                    return res.status(200).json( {error:false, errormessage:""} );
                else
                    return res.status(404).json( {error:true, errormessage:"Invalid route ID"} );
            }).catch( (reason)=> {
        return next({ statusCode:404, error: true, errormessage: "DB error: "+reason });
    })
});

app.get('/routes', auth, (req, rea, next) => {
    if(!req.users.hasAirlineRole())
        return next({statuscode: 403, error: true, errormessage: "Unauthorized"});
    routes.getModel().find({}).then((routes) => {
        return res.status(200).json(routes);
    }).catch((reason) => {
        return next({
            statuscode: 404,
            error: true,
            errormessage: "DB error" + reason
        });
    });
});
/*
    Airlines
    Steps:
    - insert -> POST    FATTO
    - update -> PUT     FATTO
    - delete -> DEL     FATTO
 */
app.post('/airlines',auth, (req,res,next) => {
    let a = airlines.newAirline( req.body );
    let u = users.newUser(req.auth).hasAdminRole();

    if( !req.body.password ) {
        return next({ statusCode:404, error: true, errormessage: "Password field missing"} );
    }
    //a.setPassword( req.body.password );
    if(u == true) {
        a.save().then((data) => {
            return res.status(200).json({error: false, errormessage: "", id: data._id});
        }).catch((reason) => {
            if (reason.code === 11000)
                return next({statusCode: 404, error: true, errormessage: "Airline already exists"});
            return next({statusCode: 404, error: true, errormessage: "DB error: " + reason.errmsg});
        })
    }
    else
        console.error("Not admin, impossible insert");
});

app.put('/airlines:id', async (req, res, next) => {
    try {
        const userId_airlines = req.params.id;
        const updateData_airlines: any = {};
        //Checks if both password and username are not empty fields
        if (!req.body.password &&
            !req.body.username &&
            !req.body.mail) {
            return next({ statusCode: 400, error: true, errormessage: "At least one field must be provided"});
        }
        //If the airline wants to update password
        if (req.body.password) {
            updateData_airlines.setPassword(req.body.password); // Dovresti hashare la password prima di salvarla
        }
        //If the airline wants to update username
        if (req.body.username) {
            updateData_airlines.username = req.body.username;
        }
        if(req.body.mail){
            updateData_airlines.mail=req.body.mail;
        }
        //Finds the airline we want to update and do it
        const updatedAirline = await airlines.getModel().findByIdAndUpdate(userId_airlines, updateData_airlines, { new: true })
            .then(
                () => {
                    return res.status(200).json(
                        { error: false,
                            errormessage: "",
                            id: updatedAirline._id });
                }
            )
            .catch(() => {
                    return next(
                        { statusCode: 404,
                            error: true,
                            errormessage: "Airline not found."
                        });
                }
            );
    } catch (error) {
        console.error("Error updating Airline:", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});

app.delete('/airlines:id', auth, (req,res,next) => {
    if( !users.newUser(req.auth).hasAdminRole() ) {
        return next({ statusCode:404, error: true, errormessage: "Unauthorized: user is not an administrator."} );
    }
    airlines.getModel().deleteOne( {_id: req.params.id } )
        .then(
            ( q )=> {
                if( q.deletedCount > 0 )
                    return res.status(200).json( {error:false, errormessage:""} );
                else
                    return res.status(404).json( {error:true, errormessage:"Invalid airline ID"} );
            }).catch( (reason)=> {
        return next({ statusCode:404, error: true, errormessage: "DB error: "+reason });
    })
});

/*
    Aircrafts
    Steps:
    - insert -> POST    FATTO
    - update -> PUT     FATTO
    - delete -> DEL     FATTO
    - ritorno ->GET     FATTO
 */
app.post('/aircrafts', auth, (req, res, next) => {
    let a = airlines.newAirline(req.auth).hasAdminRole();
    let aircraft = aircrafts.newAircraft(req.body);
    if(a){
        aircraft.save().then((data) => {
            return res.status(200).json({error: false, errormessage: "", id: data._id});
        }).catch((reason) => {
            if (reason.code === 11000)
                return next({statusCode: 404, error: true, errormessage: "Aircraft already exists"});
            return next({statusCode: 404, error: true, errormessage: "DB error: " + reason.errmsg});
        })
    }
    else
        console.error("Not airline, impossible insert")
});

app.put('/aircrafts:id', auth, async (req, res, next) =>{
    try {
        const userId_aircrafts = req.params.id;
        const updateData_aircrafts: any = {};
        if(req.users.hasAirlineRole()) {
            if (!req.body.modell &&
                !req.body.seats) {
                return next({statusCode: 400, error: true, errormessage: "At least one field must be provided"});
            }
            if (req.body.modell) {
                updateData_aircrafts.modell = req.body.modell;
            }
            if (req.body.seats) {
                updateData_aircrafts.seats = req.body.seats;
            }

            const updatedAircraft= await airlines.getModel().findByIdAndUpdate(userId_aircrafts, updateData_aircrafts, {new: true})
                .then(
                    () => {
                        return res.status(200).json(
                            {
                                error: false,
                                errormessage: "",
                                id: updatedAircraft._id
                            });
                    }
                )
                .catch(() => {
                        return next(
                            {
                                statusCode: 404,
                                error: true,
                                errormessage: "Aircraft not found."
                            });
                    }
                );
        }
    } catch (error) {
        console.error("Error updating Aircraft:", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});

app.delete('/aircrafts:id', auth, (req, res, next) => {
    if( !users.newUser(req.auth).hasAirlineRole()) {
        return next({ statusCode:404, error: true, errormessage: "Unauthorized: user is not an administrator."} );
    }
    aircrafts.getModel().deleteOne( {_id: req.params.id } )
        .then(
            ( q )=> {
                if( q.deletedCount > 0 )
                    return res.status(200).json( {error:false, errormessage:""} );
                else
                    return res.status(404).json( {error:true, errormessage:"Invalid aircraft ID"} );
            }).catch( (reason)=> {
        return next({ statusCode:404, error: true, errormessage: "DB error: "+reason });
    })
});

app.get('/aircrafts', (req, res, next) => {
   aircrafts.getModel().find({}, {}).then((aircrafts) => {
       return res.status(200).json(aircrafts);
   }).catch( (reason)=> {
       return next({statuscode: 404, error: true, errormessage: "DB error" + reason});
   })
});
/*
Flights
    Steps:
    - insert -> POST    FATTO
    - update -> PUT     FATTO
    - delete -> DEL     FATTO
    - ritorno-> GET     FATTO
 */

app.post('/flights', auth, (req, res, next) => {
    if(!req.users.hasAirlineRole()) {
        return next({statuscode: 403, error: true, errormessage: "Unauthorized."} );
    }
    else{
        let f = flights.newFlight(req.body);
        f.save().then((data) => {return res.status(200).json({error: false, errormessage: '', id: data._id})
        }).catch((reason) => {
            if(reasoncode === 11000){
                return next({
                    statuscode: 409,
                    error: true,
                    errormessage: "Flight already exists"
                });
            }else{
                return next({
                    statudcode: 404,
                    errir: true,
                    errormessage: "DB error" + reason.errmsg
                });
            }
        });
    }
});

app.get('/flights', (req, rea, next) => {
    flights.getModel().find({}).then((flights) => {
       return res.status(200).json(flights);
    }).catch((reason) => {
        return next({
            statuscode: 404,
            error: true,
            errormessage: "DB error" + reason
        });
    });
});

app.delete('/flights:id', auth, (req, res, next) => {
    if(!req.users.hasAirlineRole()){
        return next({
           statuscode: 403,
            error: true,
            errormessage: "Unauthorized"
        });
    }else{
        flights.getModel().deleteOne({id: req.params.id}).then(
            (q) => {
                if(q.deletedCount > 0)
                    return res.status(200).json({error: false, errormessage: ""});
                else
                    return res.status(404).json({error: true, errormessage: "Flight with ID" + req.params.id + "not found"});
            }).catch((reason) => {
                return next({statuscode: 404, error: true, errormessage: "DB error" + reason});
            });
    }
});

app.put('/flights:id', auth, async (req, res, next) =>{
    try {
        const userId_flights = req.params.id;
        const updateData_flights: any = {};
        if(req.users.hasAirlineRole()) {
            if (!req.body.airline &&
                !req.body.aircraft &&
                !req.body.route &&
                !req.body.ticket &&
                !req.body.departTime) {
                    return next({statusCode: 400, error: true, errormessage: "At least one field must be provided"});
            }
            if (req.body.airline) {
                updateData_flights.airline = req.body.airline;
            }
            if (req.body.aircraft) {
                updateData_flights.aircraft = req.body.aircraft;
            }
            if (req.body.route) {
                updateData_flights.route = req.body.route;
            }
            if (req.body.ticket) {
                updateData_flights.ticket = req.body.ticket;
            }
            if(req.body.departTime){
                updateData_flights.departTime = req.body.departTime;
            }

            const updatedFlight= await flights.getModel().findByIdAndUpdate(userId_flights, updateData_flights, {new: true})
                .then(
                    () => {
                        return res.status(200).json(
                            {
                                error: false,
                                errormessage: "",
                                id: updatedFlight._id,
                            });
                    }
                )
                .catch(() => {
                        return next(
                            {
                                statusCode: 404,
                                error: true,
                                errormessage: "Flight not found."
                            });
                    }
                );
        }
    } catch (error) {
        console.error("Error updating Flight:", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});

/*
Tickets
    Steps:
    - insert -> POST    FATTO
    - update -> PUT     FATTO
    - delete -> DEL     FATTO
    - ritorno-> GET     FATTO
 */

app.post('/tickets', auth, (req, res, next) => {
    if(!req.users.hasPassangerRole()) {
        return next({statuscode: 403, error: true, errormessage: "Unauthorized."} );
    }
    else{
        let t = tickets.newTicket(req.body);
        f.save().then((data) => {return res.status(200).json({error: false, errormessage: '', id: data._id})
        }).catch((reason) => {
            if(reasoncode === 11000){
                return next({
                    statuscode: 409,
                    error: true,
                    errormessage: "Flight already exists"
                });
            }else{
                return next({
                    statudcode: 404,
                    errir: true,
                    errormessage: "DB error" + reason.errmsg
                });
            }
        });
    }
});

app.get('/tickets', (req, rea, next) => {
    if(!req.users.hasAirlineRole() && !req.users.hasPassangerRole())
        return next({statuscode: 403, error: true, errormessage: "Unauthorized."} );
    tickets.getModel().find({}).then((tickets) => {
        return res.status(200).json(tickets);
    }).catch((reason) => {
        return next({
            statuscode: 404,
            error: true,
            errormessage: "DB error" + reason
        });
    });
});

app.delete('/tickets:id', auth, (req, res, next) => {
    if(!req.users.hasPassangerRole()){
        return next({
            statuscode: 403,
            error: true,
            errormessage: "Unauthorized"
        });
    }else{
        tickets.getModel().deleteOne({id: req.params.id}).then(
            (q) => {
                if(q.deletedCount > 0)
                    return res.status(200).json({error: false, errormessage: ""});
                else
                    return res.status(404).json({error: true, errormessage: "Ticket with ID" + req.params.id + "not found"});
            }).catch((reason) => {
            return next({statuscode: 404, error: true, errormessage: "DB error" + reason});
        });
    }
});

app.put('/tickets:id', auth, async (req, res, next) =>{
    try {
        const userId_tickets = req.params.id;
        const updateData_tickets: any = {};
        if(req.users.hasPassangerRole()) {
            if (!req.body.user &&
                !req.body.seat &&
                !req.body.flight &&
                !req.body.numCabinBag &&
                !req.body.numCheckedLuggages &&
                !req.body.price) {
                return next({statusCode: 400, error: true, errormessage: "At least one field must be provided"});
            }
            if (req.body.user) {
                updateData_tickets.user = req.body.user;
            }
            if (req.body.seat) {
                updateData_tickets.seat = req.body.seat;
            }
            if (req.body.flight) {
                updateData_tickets.flight = req.body.flight;
            }
            if (req.body.numCabinBag) {
                updateData_tickets.numCabinBag = req.body.numCabinBag;
            }
            if(req.body.numCheckedLuggages) {
                updateData_tickets.setNumCheckedLuggages = req.body.numCheckedLuggages;
            }
            if(req.body.price) {
                updateData_tickets.price = req.body.price;
            }

            const updatedTicket= await tickets.getModel().findByIdAndUpdate(userId_tickets, updateData_tickets, {new: true})
                .then(
                    () => {
                        return res.status(200).json(
                            {
                                error: false,
                                errormessage: "",
                                id: updatedTicket._id,
                            });
                    }
                )
                .catch(() => {
                        return next(
                            {
                                statusCode: 404,
                                error: true,
                                errormessage: "Ticket not found."
                            });
                    }
                );
        }
    } catch (error) {
        console.error("Error updating Ticket:", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});