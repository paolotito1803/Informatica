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
import { DB_initialization } from "./DB_initialization";

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
app.put("/users/:id", auth, async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updateData: any = {};
        //Checks if both password and username are not empty fields
        if (!req.body.password &&
            !req.body.username &&
            !req.body.mail &&
            !req.body.passportID) {
            return next(
                { statusCode: 400,
                    error: true,
                    errormessage: "At least one field must be provided"
                });
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
        /*
        if (!updatedUser) {
            return next(
                { statusCode: 404,
                    error: true,
                    errormessage: "User not found."
                });
        }
        return res.status(200).json(
            { error: false,
                errormessage: "",
                id: updatedUser._id });

         */
    } catch (error) {
        console.error("Error updating user:", error);
        return next(
            { statusCode: 500,
                error: true,
                errormessage: "DB error: " + error.message
            });
    }
});

/*
    Routes
    In this section we have to insert/update/delete the routes.
    Note: only an airline may insert a route!

    Steps:
    - insert ->
    - update ->
    - delete ->
 */

/*
    Airlines

    Steps:
    - insert -> POST
    - update -> PUT
    - delete -> DEL
 */
app.post('/airlines', (req,res,next) => {
    let a = airlines.newAirlines( req.body );
    if( !req.body.password ) {
        return next({ statusCode:404, error: true, errormessage: "Password field missing"} );
    }
    //a.setPassword( req.body.password );

    a.save().then( (data) => {
        return res.status(200).json({ error: false, errormessage: "", id: data._id });
    }).catch( (reason) => {
        if( reason.code === 11000 )
            return next({statusCode:404, error:true, errormessage: "User already exists"} );
        return next({ statusCode:404, error: true, errormessage: "DB error: "+reason.errmsg });
    })
});