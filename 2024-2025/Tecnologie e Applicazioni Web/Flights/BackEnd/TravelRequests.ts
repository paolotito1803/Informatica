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
import { Users } from './Users';
import * as users from './Users';

import {Routes} from './Routes';
import * as routes from './Routes';

import {Airlines} from './Airlines';
import * as airlines from './Airlines';

import {Aircrafts} from "./Aircrafts";
import * as aircrafts from './Aircrafts';

import {Flights} from "./Flights";
import * as flights from './Flights';

import {Seats} from "./Seats";
import * as seats from './Seats';

import {Tickets} from "./Tickets";
import * as tickets from './Tickets';

import {Airports} from "./Airports";
import * as airports from './Airports';

import express = require('express');

import passport = require('passport');           // authentication middleware for Express
import passportHTTP = require('passport-http');  // implements Basic and Digest authentication for HTTP (used for /login endpoint)

import jsonwebtoken = require('jsonwebtoken');  // JWT generation
const { expressjwt: jwt } = require('express-jwt');            // JWT parsing middleware for express

import cors = require('cors');                  // Enable CORS middleware
const io = require('socket.io');               // Socket.io websocket library
import { nextTick } from 'process';

let app = express();
let ios = undefined
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
    res.status(200).json( { api_version: "1.0", endpoints: [ "/users", "/login" ] } ); // json method sends a JSON response (setting the correct Content-Type) to the client
});

/*
Utenti -> users:
login -> get FATTO
registrazione -> post FATTO
delete -> del FATTO
modifica dati -> put
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
        admin: req.user.admin,
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
        return next({ statusCode:404, error: true, errormessage: "Unauthorized: user is not a moderator"} );
    }

    users.getModel().deleteOne( {_id: req.params.id } ).then(
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

// Connect to mongodb and launch the HTTP server trough Express
mongoose.connect( 'mongodb://mymongo:27017/flight_project' )
    .then(
        () => {
            console.log("Connected to MongoDB");
            return users.getModel().findOne( {mail:"admin@project_flight.it"} );
        }
    ).then(
    (doc) => {
        if (!doc) {
            console.log("Creating admin user");
            let u = users.newUser({
                username: "admin",
                mail: "admin@project_flight.it"
            });
            u.setAdmin();
            u.setPassword("admin");
            return u.save()
        } else {
            console.log("Admin user already exists");
        }
    }
)
    .then(
        () => {
            return users.getModel().countDocuments({})
        }
    ).then(
    (count) => { //dati di test per tutti i documenti
        if (count == 0) {
            console.log("Adding some test messages into the database");
            let m1 = users
                .getModel()
                .create({
                    authormail: "admin@project_flight.it"
                });
            let m2 = users
                .getModel()
                .create({
                    authormail: "admin@project_flight.it"
                });
            let m3 = users
                .getModel()
                .create({
                    authormail: "admin@project_flight.it"
                });
            return Promise.all([m1, m2, m3]);
        }
    }
).then(
    () => {
        let server = http.createServer(app);

        ios = io(server, {
            cors: {
                origin: "http://localhost:4200" // See: https://socket.io/docs/v4/handling-cors/#configuration
            }
        });

        ios.on('connection', function (client) {
            console.log("Socket.io client connected".green);
        });

        //server.listen(8080, () => console.log("HTTP Server started on port 8080".green));

        // To start an HTTPS server we create an https.Server instance
        // passing the express application middleware. Then, we start listening
        // on port 8443
        //

        https.createServer({
            key: fs.readFileSync('/keys/key.pem'),
            cert: fs.readFileSync('/keys/cert.pem')
        }, app).listen(8443);
    }
).catch(
    (err) => {
        console.log("Error Occurred during initialization".red );
        console.log(err);
    }
)