
import mongoose = require("mongoose");
import http = require("http");
import https = require("https");
import fs = require("fs");
const io = require("socket.io");

import * as users from "../DB_classes/Users"
import * as airlines from "../DB_classes/Airlines"
import * as airports from "../DB_classes/Airports"
import * as tickets from "../DB_classes/Tickets"
import * as routes from "../DB_classes/Routes"
import * as seats from "../DB_classes/Seats"
import * as flights from "../DB_classes/Flights"
import * as aircrafts from "../DB_classes/Aircrafts"
import {Airlines} from "../DB_classes/Airlines";
import {Aircrafts} from "../DB_classes/Aircrafts";
import {Routes} from "../DB_classes/Routes";
import {Tickets} from "../DB_classes/Tickets";
import {Users} from "../DB_classes/Users";
import {Seats} from "../DB_classes/Seats";
import {Flights} from "../DB_classes/Flights";


let ios = undefined;


export function DB_initialization(app) {
// Connect to mongodb and launch the HTTP server trough Express
    mongoose.connect('mongodb://mymongo:27017/flight_project')
        .then(
            () => {
                console.log("Connected to MongoDB");
                return users.getModel().findOne({mail: "admin@project_flight.it"});
            }
        ).then(
        (doc) => {
            if (!doc) {
                console.log("Creating admin user");
                let u = users.newUser({
                    username: "admin",
                    passportID: "ADMIN",
                    mail: "admin@project_flight.it"
                });
                u.setRole("admin");
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
                console.log("Adding some test users into the database");
                let m1 = users
                    .getModel()
                    .create({
                        username: "micbos71",
                        passportID: "KS2718281",
                        mail: "mic.bos.71@project_flight.it",
                        roles: ["passenger"]
                    });
                let m2 = users
                    .getModel()
                    .create({
                        username: "bordjack47",
                        passportID: "VY3141592",
                        mail: "bordjack47@project_flight.it",
                        roles: ["passenger"]
                    });
                let m3 = users
                    .getModel()
                    .create({
                        username: "tito_paul",
                        passportID: "GK1618033",
                        mail: "paul.tito@project_flight.it",
                        roles: ["passenger"]
                    });
                return Promise.all([m1, m2, m3]);
            }
        }
    ).then(
        () => {
            return airlines.getModel().countDocuments({})
        }
    ).then(
        (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test airlines into the database");
                let a1 = airlines
                    .getModel()
                    .create({
                        name: "Singapore Airlines",
                        passportID: "SINGAIR",
                        mail: "singapore.airlines@project_flight.sg",
                        roles: ["airline"]
                    });
                let a2 = airlines
                    .getModel()
                    .create({
                        name: "ITA Airways",
                        passportID: "ITAAIR",
                        mail: "ita.airways@project_flight.it",
                        roles: ["airline"]
                    });
                let a3 = airlines
                    .getModel()
                    .create({
                        username: "Lufthansa",
                        passportID: "LUFTHANSA",
                        mail: "lufthansa.fluggesellschaften@project_flight.it",
                        roles: ["airline"]
                    });
                return Promise.all([a1, a2, a3]);
            }
        }
    ).then(
        () => {
            return airports.getModel().countDocuments({})
        }
    ).then(
        (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test airlines into the database");
                let a1 = airports
                    .getModel()
                    .create({
                        name: "VCE",
                        city: "Venice",
                        state: "Italy",
                        position: [45.3019, 12.2107]
                        /*
                            Coordinates:
                            N +
                            S -
                            E +
                            W -
                         */
                    });
                let a2 = airports
                    .getModel()
                    .create({
                        name: "FRA",
                        city: "Frankfurt am Main",
                        state: "Germany",
                        position: [50.0379, 8.5622]
                    });
                let a3 = airports
                    .getModel()
                    .create({
                        name: "JFK",
                        city: "New York City",
                        state: "United States of America",
                        position: [40.641766, -73.780968]
                    });
                return Promise.all([a1, a2, a3]);
            }
        }
    ).then(
        () => {
            return routes.getModel().countDocuments({})
        }
    ).then(
        (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test airlines into the database");
                let a1 = routes
                    .getModel()
                    .create({
                        destination: airports.getModel().findOne({name: "VCE"}),
                        depart: airports.getModel().findOne({name: "FRA"})
                    });
                let a2 = routes
                    .getModel()
                    .create({
                        destination: airports.getModel().findOne({name: "VCE"}),
                        depart: airports.getModel().findOne({name: "JFK"}),
                        layoverFuel: airports.getModel().findOne({name: "FRA"})
                    });
                let a3 = routes
                    .getModel()
                    .create({
                        destination: airports.getModel().findOne({name: "FRA"}),
                        depart: airports.getModel().findOne({name: "JFK"})
                    });
                return Promise.all([a1, a2, a3]);
            }
        }
        /*
            Aircrafts
            Seats
            Tickets
            Flights
         */
    ).then(
        () => {
            return aircrafts.getModel().countDocuments({})
        }
    ).then(
        (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test airlines into the database");
                let a1_seats: seats.Seats[]
                let a2_seats: seats.Seats[]
                let a3_seats: seats.Seats[]
                let a1 = aircrafts
                    .getModel()
                    .create({
                        aircraftID: "A6-ECI",
                        aircraftModel: "Boeing 777-300ER",
                        seat: a1_seats
                    });
                let a2 = aircrafts
                    .getModel()
                    .create({
                        aircraftID: "G-YMMN",
                        aircraftModel: "Boeing 777-200ER",
                        seat: a2_seats
                    });
                let a3 = aircrafts
                    .getModel()
                    .create({
                        aircraftID: "SQ638",
                        aircraftModel: "Airbus A380-800",
                        seat: a3_seats
                    });
                return Promise.all([a1, a2, a3]);
            }
        }
        /*
            Seats
            Tickets
            Flights
         */
    ).then(
        () => {
            return seats.getModel().countDocuments({})
        }
    ).then(
        (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test airlines into the database");
                let s1 = seats
                    .getModel()
                    .create({
                        numberSeat: "A1",
                        classes: "Business",
                        legroom: true,
                        isFree: true
                    });
                let s2 = seats
                    .getModel()
                    .create({
                        numberSeat: "B1",
                        classes: "Economy",
                        legroom: false,
                        isFree: true
                    });
                let s3 = seats
                    .getModel()
                    .create({
                        numberSeat: "C1",
                        classes: "First",
                        legroom: true,
                        isFree: false
                    });
                return Promise.all([s1, s2, s3]);
            }
        }
        /*
            Tickets
            Flights
         */
    ).then(
        () => {
            return flights.getModel().countDocuments({})
        }
    ).then(
        (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test airlines into the database");
                let s1 = flights
                    .getModel()
                    .create({
                        airline: airlines.getModel().findOne({name: "ITA Airways"}),
                        aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 777-200ER"}),
                        route: routes.getModel().findOne({depart: "VCE", destination: "FRA"}),
                        tickets: "Tickets[]",
                        departTime: new Date().setFullYear(2025, 5, 20)
                    });
                let s2 = flights
                    .getModel()
                    .create({
                        airline: airlines.getModel().findOne({name: "Lufthansa"}),
                        aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A380-800"}),
                        route: routes.getModel().findOne({depart: "FRA", destination: "JFK"}),
                        tickets: "Tickets[]",
                        departTime: new Date().setFullYear(2025, 4, 20)
                    });
                let s3 = flights
                    .getModel()
                    .create({
                        airline: airlines.getModel().findOne({name: "ITA Airways"}),
                        aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 777-300ER"}),
                        route: routes.getModel().findOne({depart: "VCE", destination: "JFK"}),
                        tickets: "Tickets[]",
                        departTime: new Date().setFullYear(2025, 3, 20)
                    });
                return Promise.all([s1, s2, s3]);
            }
        }
        /*
            Tickets
         */
    ).then(
        () => {
            return tickets.getModel().countDocuments({})
        }
    ).then(
        (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test airlines into the database");
                let s1 = tickets
                    .getModel()
                    .create({
                        user: users.getModel().findOne({username: "micbos71"}),
                        seat: seats.getModel().findOne({numberSeat: "A1"}),
                        flight: flights.getModel().findOne({/* flightCode, eg. EK135 */}), /* FRA-JFK */
                        numCabinBag: 2,
                        numCheckedLuggages: 1,
                        price: 349.99,
                    });
                let s2 = tickets
                    .getModel()
                    .create({
                        user: users.getModel().findOne({username: "bordjack47"}),
                        seat: seats.getModel().findOne({numberSeat: "B1"}),
                        flight: flights.getModel().findOne({/* flightCode, eg. EK135 */}), /* VCE-FRA */
                        numCabinBag: 1,
                        numCheckedLuggages: 0,
                        price: 149.99,
                    });
                let s3 = tickets
                    .getModel()
                    .create({
                        user: users.getModel().findOne({username: "tito_paul"}),
                        seat: seats.getModel().findOne({numberSeat: "C1"}),
                        flight: flights.getModel().findOne({/* flightCode, eg. EK135 */}), /* VCE-JFK */
                        numCabinBag: 2,
                        numCheckedLuggages: 2,
                        price: 1999.99,
                    });
                return Promise.all([s1, s2, s3]);
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
            console.log("Error Occurred during initialization".red);
            console.log(err);
        }
    );
}