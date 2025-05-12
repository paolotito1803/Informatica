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

import passport = require('passport');           // authentication middleware for Express
import passportHTTP = require('passport-http');  // implements Basic and Digest authentication for HTTP (used for /login endpoint)

import jsonwebtoken = require('jsonwebtoken');  // JWT generation
const { expressjwt: jwt } = require('express-jwt');            // JWT parsing middleware for express

import cors = require('cors');                  // Enable CORS middleware
const io = require('socket.io');               // Socket.io websocket library
import { nextTick } from 'process';