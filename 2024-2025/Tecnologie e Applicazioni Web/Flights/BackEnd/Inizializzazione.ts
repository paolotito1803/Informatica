import mongoose = require("mongoose");
import http = require("http");
import https = require("https");
import fs = require("fs");
const io = require("socket.io");
import crypto = require('crypto');
import * as Users from "./Users";
import * as Tickets from "./Tickets";
import * as Aircrafts from "./Aircrafts"
import * as Airlines from "./Airlines";
import * as Airports from "./Airports";
import * as Routes from "./Routes";
import * as Seats from "./Seats";
import * as Flights from "./Flights";

let ios = undefined;
export function Inizializzazione(app){
    mongoose.connect('mongodb://mongoproject:27017/flight_project').then(() => {
        console.log("connected to mongodb");
        return Users.getModel().findOne({mail : 'admin@project_flight.it'})
    }).then((doc) => {
            if (!doc) {
                console.log("Creating admin user");
                let u = Users.newUser({
                    username: "admin",
                    passportID: "ADMIN",
                    mail: "admin@project_flight.it"
                });
                u.setRole("admin");
                u.setPassword("admin");
                return u.save();
            } else {
                console.log("Admin user already exists");
            }
    }).then(() => {
                return Users.getModel().countDocuments({})
            }
        ).then(
        (count) => { //dati di test per tutti i documenti
            if (count-1 == 0) {
                console.log("Adding some test users into the database");
                let m1 = Users
                    .getModel()
                    .create({
                        username: "micbos71",
                        passportID: "KS2718281",
                        mail: "mic.bos.71@project_flight.it",
                        roles: "passenger"
                    });
                let m2 = Users
                    .getModel()
                    .create({
                        username: "bordjack47",
                        passportID: "VY3141592",
                        mail: "bordjack47@project_flight.it",
                        roles: "passenger"
                    });
                let m3 = Users
                    .getModel()
                    .create({
                        username: "tito_paul",
                        passportID: "GK1618033",
                        mail: "paul.tito@project_flight.it",
                        roles: "passenger"
                    });
                return Promise.all([m1, m2, m3]);
            }
        }).then(() => {
                return Tickets.getModel().countDocuments({})
        }
        ).then( async (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test ticket into the database");
                let username1 = await Users.getModel().findOne({username : 'micbos71'});
                let code_user1 = username1._id;
                let username2 = await Users.getModel().findOne({username : 'bordjack47'});
                let code_user2 = username2._id;
                let username3 = await Users.getModel().findOne({username : 'tito_paul'});
                let code_user3 = username3._id;
                let t1 = Tickets
                    .getModel()
                    .create({
                        user: code_user1,
                        seat: "A1",
                        flight: "A101",
                        price: 10,
                        numBag: 1,
                        _code: "1"
                    });
                let t2 = Tickets
                    .getModel()
                    .create({
                        user: code_user2,
                        seat: "A2",
                        flight: "A102",
                        price: 20,
                        numBag: 2,
                        _code: "2"
                    });
                let t3 = Tickets
                    .getModel()
                    .create({
                        user: code_user3,
                        seat: "A3",
                        flight: "A103",
                        price: 30,
                        numBag: 3,
                        _code: "3"
                    });
                return Promise.all([t1, t2, t3]);
            }
        }).then(() => {
                return Aircrafts.getModel().countDocuments({})
        }
        ).then( (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test aircraft into the database");
                let a1 = Aircrafts
                    .getModel()
                    .create({
                       _numAircraft : "1",
                       seats: [{_numSeat : "A1", class : "Economy", legroom : false, isFree : true},
                                {_numSeat : "A2", class : "Business", legroom : true, isFree : true},
                                {_numSeat : "A3", class : "First", legroom : true, isFree : false}
                            ],
                        modello : "Boing737"
                    });
                let a2 = Aircrafts
                    .getModel()
                    .create({
                       _numAircraft : "2",
                       seats: [{_numSeat : "A1", class : "Economy", legroom : false, isFree : true},
                                {_numSeat : "A2", class : "Business", legroom : true, isFree : true},
                                {_numSeat : "A3", class : "First", legroom : true, isFree : false}
                            ],
                        modello : "Boing747"
                    });
                    let a3 = Aircrafts
                    .getModel()
                    .create({
                       _numAircraft : "3",
                       seats: [{_numSeat : "A1", class : "Economy", legroom : false, isFree : true},
                                {_numSeat : "A2", class : "Business", legroom : true, isFree : true},
                                {_numSeat : "A3", class : "First", legroom : true, isFree : false}
                            ],
                        modello : "Boing767"
                    });
                return Promise.all([a1, a2, a3]);
            }
        }).then(() => {
                return Airlines.getModel().countDocuments({})
        }
        ).then( (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test aircraft into the database");
                let air1 = Airlines
                    .getModel()
                    .create({
                       _signature : "ITA",
                       name : "ITA Airways",
                       revenue : 10,
                       aircrafts : [{_numAircraft : "1", seats: [{_numSeat : "A1", class : "Economy", legroom : false, isFree : true}, {_numSeat : "A2", class : "Business", legroom : true, isFree : true}, {_numSeat : "A3", class : "First", legroom : true, isFree : false}], modello : "Boing737"}],
                       duration : 60
                    });
                let air2 = Airlines
                    .getModel()
                    .create({
                       _signature : "LH",
                       name : "Lufthansa",
                       revenue : 100,
                       aircrafts : [{_numAircraft : "2", seats: [{_numSeat : "B1", class : "Business", legroom : true, isFree : false}, {_numSeat : "B2", class : "First", legroom : true, isFree : true}, {_numSeat : "B3", class : "Economy", legroom : false, isFree : false}], modello : "Boing747"}],
                       duration : 50
                    });
                    let air3 = Airlines
                    .getModel()
                    .create({
                       _signature : "EK",
                       name : "Emirates",
                       revenue : 100,
                       aircrafts : [{_numAircraft : "3", seats: [{_numSeat : "C1", class : "First", legroom : true, isFree : true}, {numSeat : "C2", class : "Economy", legroom : true, isFree : true}, {_numSeat : "C3", class : "Buisness", legroom : false, isFree : true}], modello : "Boing767"}],
                       duration : 40
                    });
                return Promise.all([air1, air2, air3]);
            }
        }).then(() => {
                return Airports.getModel().countDocuments({})
        }
        ).then( (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test airport into the database");
                let airp1 = Airports
                    .getModel()
                    .create({
                       _code : "011",
                       name : "Marco Polo",
                       City : "Venice"
                    });
                let airp2 = Airports
                    .getModel()
                    .create({
                       _code : "012",
                       name : "JFK",
                       City : "Ney York"
                    });
                let airp3 = Airports
                .getModel()
                .create({
                    _code : "013",
                    name : "FCO",
                    City : "Rome"
                });
                return Promise.all([airp1, airp2, airp3]);
            }
        }).then(() => {
                return Routes.getModel().countDocuments({})
        }
        ).then( (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test route into the database");
                let r1 = Routes
                    .getModel()
                    .create({
                       destination : "JFK",
                       departure : "VCE",
                       layoverFuel : ["FCO"]
                    });
                let r2 = Routes
                    .getModel()
                    .create({
                        destination : "FCO",
                        departure : "VCE",
                    });
                let r3 = Routes
                .getModel()
                .create({
                        destination : "JFK",
                        departure : "FCO",
                });
                return Promise.all([r1, r2, r3]);
            }
        }).then(() => {
                return Seats.getModel().countDocuments({})
        }
        ).then( (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test seat into the database");
                let s1 = Seats
                    .getModel()
                    .create({
                       _numSeat : "A1",
                       class : "Economy",
                       legroom : false,
                       isFree : true
                    });
                let s2 = Seats
                    .getModel()
                    .create({
                        _numSeat : "A2", 
                        class : "Business", 
                        legroom : true, 
                        isFree : true
                    });
                let s3 = Seats
                .getModel()
                .create({
                        _numSeat : "A3",
                        class : "First", 
                        legroom : true, 
                        isFree : false
                });
                return Promise.all([s1, s2, s3]);
            }
        }).then(() => {
                return Flights.getModel().countDocuments({})
        }
        ).then( async (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test seat into the database");
                let route1 = await Routes.getModel().findOne({destination : "JFK", departure : "VCE"});
                let routeid1 = route1._id
                let route2 = await Routes.getModel().findOne({destination : "JFK", departure : "FCO"});
                let routeid2 = route2._id;
                let route3 = await Routes.getModel().findOne({destination : "FCO", departure : "VCE"});
                let routeid3 = route3._id;
                let f1 = Flights
                    .getModel()
                    .create({
                      _flightCode : "AB104",
                      dataOra : new Date(2025, 6, 25, 15, 30),
                      route : routeid1,
                      aircraft : "ITA"
                    });
                let f2 = Flights
                    .getModel()
                    .create({
                        _flightCode : "AB105",
                      dataOra : new Date(2025, 6, 15, 5, 30),
                      route : routeid2,
                      aircraft : "LH"
                    });
                let f3 = Flights
                .getModel()
                .create({
                         _flightCode : "AB106",
                      dataOra : new Date(2025, 9, 25, 18, 0),
                      route : routeid3,
                      aircraft : "EK"
                });
                return Promise.all([f1, f2, f3]);
            }
        }).then(() => {
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

            /*https.createServer({
                key: fs.readFileSync('/keys/key.pem'),
                cert: fs.readFileSync('/keys/cert.pem')
            }, app).listen(8443);*/
        }
    ).catch(
        (err) => {
            console.log("Error Occurred during initialization".red);
            console.log(err);
        }
    );
}