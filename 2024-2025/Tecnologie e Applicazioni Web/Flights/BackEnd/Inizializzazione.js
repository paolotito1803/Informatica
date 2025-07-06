"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inizializzazione = Inizializzazione;
const mongoose = require("mongoose");
const http = require("http");
const io = require("socket.io");
const Users = require("./Users");
const Tickets = require("./Tickets");
const Aircrafts = require("./Aircrafts");
const Airlines = require("./Airlines");
const Airports = require("./Airports");
const Routes = require("./Routes");
const Seats = require("./Seats");
const Flights = require("./Flights");
let ios = undefined;
function Inizializzazione(app) {
    mongoose.connect('mongodb://mongoproject:27017/flight_project').then(() => {
        console.log("connected to mongodb");
        return Users.getModel().findOne({ mail: 'admin@project_flight.it' });
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
        }
        else {
            console.log("Admin user already exists");
        }
    }).then(() => {
        return Users.getModel().countDocuments({});
    }).then((count) => {
        if (count - 1 == 0) {
            console.log("Adding some test users into the database");
            let m1 = Users.newUser({
                username: "micbos71",
                passportID: "KS2718281",
                mail: "mic.bos.71@project_flight.it",
                roles: "passenger",
                tickets: []
            });
            m1.setPassword("123456");
            //m1.save();
            let m2 = Users.newUser({
                username: "bordjack47",
                passportID: "VY3141592",
                mail: "bordjack47@project_flight.it",
                roles: "passenger",
                tickets: []
            });
            m2.setPassword("7891011");
            //m2.save();
            let m3 = Users.newUser({
                username: "tito_paul",
                passportID: "GK1618033",
                mail: "paul.tito@project_flight.it",
                roles: "passenger",
                tickets: []
            });
            m3.setPassword("abdef");
            //m3.save();
            let m4 = Users.newUser({
                username: "lufthansa",
                passportID: "AB12345",
                mail: "lufthansa@project_flight.it",
                roles: "airline",
                tickets: []
            });
            m4.setPassword("prova");
            //m4.save();
            let m5 = Users.newUser({
                username: "emirates",
                passportID: "EM6754",
                mail: "emirates@project_flight.it",
                roles: "airline",
                tickets: []
            });
            m5.setPassword("ek12345");
            //m5.save();
            let m6 = Users.newUser({
                username: "ITA Airways",
                passportID: "IT2025",
                mail: "ITA.airways@project_flight.it",
                roles: "airline",
                tickets: []
            });
            m6.setPassword("provaI");
            //m6.save();
            return Promise.all([m1.save(), m2.save(), m3.save(), m4.save(), m5.save(), m6.save()]);
        }
    }).then(() => {
        return Tickets.getModel().countDocuments({});
    }).then(async (count) => {
        if (count == 0) {
            console.log("Adding some test ticket into the database");
            // Ora possiamo recuperare gli utenti (sono sicuramente creati)
            let username1 = Users.getModel().findOne({ username: 'micbos71' });
            let username2 = Users.getModel().findOne({ username: 'bordjack47' });
            let username3 = Users.getModel().findOne({ username: 'tito_paul' });
            let username4 = Users.getModel().findOne({ username: 'lufthansa' });
            let username5 = Users.getModel().findOne({ username: 'emirates' });
            let username6 = Users.getModel().findOne({ username: 'ITA Airways' });
            let users = await Promise.all([username1, username2, username3, username4, username5, username6]);
            if (users.some(u => !u)) {
                console.error("Uno o più utenti non trovati, salto la creazione dei ticket.");
                return;
            }
            let [u1, u2, u3, u4, u5, u6] = users;
            // Creiamo i biglietti, aspettiamo che siano salvati e associati agli utenti
            let t1 = Tickets.getModel().create({
                user: u1._id,
                seat: "A1",
                flight: "AB104",
                price: 10,
                numBag: 1,
                _code: "1"
            }).then(ticket => {
                u1.tickets.push(ticket);
                return u1.save();
            });
            let t2 = Tickets.getModel().create({
                user: u2._id,
                seat: "A2",
                flight: "AB105",
                price: 20,
                numBag: 2,
                _code: "2"
            }).then(ticket => {
                u2.tickets.push(ticket);
                return u2.save();
            });
            let t3 = Tickets.getModel().create({
                user: u3._id,
                seat: "A3",
                flight: "AB106",
                price: 30,
                numBag: 3,
                _code: "3"
            }).then(ticket => {
                u3.tickets.push(ticket);
                return u3.save();
            });
            let t4 = Tickets.getModel().create({
                user: u4._id,
                seat: "A3",
                flight: "AB107",
                price: 1000,
                numBag: 1,
                _code: "4"
            }).then(ticket => {
                u4.tickets.push(ticket);
                return u4.save();
            });
            let t5 = Tickets.getModel().create({
                user: u5._id,
                seat: "A3",
                flight: "AB108",
                price: 30,
                numBag: 1,
                _code: "5"
            }).then(ticket => {
                u5.tickets.push(ticket);
                return u5.save();
            });
            let t6 = Tickets.getModel().create({
                user: u6._id,
                seat: "A3",
                flight: "AB109",
                price: 10,
                numBag: 3,
                _code: "6"
            }).then(ticket => {
                u6.tickets.push(ticket);
                return u6.save();
            });
            return Promise.all([t1, t2, t3, t4, t5, t6]);
        }
    }).then(() => {
        return Aircrafts.getModel().countDocuments({});
    }).then((count) => {
        if (count == 0) {
            console.log("Adding some test aircraft into the database");
            let a1 = Aircrafts
                .getModel()
                .create({
                _numAircraft: "1",
                seats: [{ _numSeat: "A1", class: "Economy", legroom: false, isFree: true },
                    { _numSeat: "A2", class: "Business", legroom: true, isFree: true },
                    { _numSeat: "A3", class: "First", legroom: true, isFree: false }],
                modello: "Boing737"
            });
            let a2 = Aircrafts
                .getModel()
                .create({
                _numAircraft: "2",
                seats: [{ _numSeat: "B1", class: "Business", legroom: true, isFree: false },
                    { _numSeat: "B2", class: "First", legroom: true, isFree: true },
                    { _numSeat: "B3", class: "Economy", legroom: false, isFree: false }],
                modello: "Boing747"
            });
            let a3 = Aircrafts
                .getModel()
                .create({
                _numAircraft: "3",
                seats: [{ _numSeat: "C1", class: "First", legroom: true, isFree: true },
                    { _numSeat: "C2", class: "Economy", legroom: true, isFree: true },
                    { _numSeat: "C3", class: "Buisness", legroom: false, isFree: true }],
                modello: "Boing767"
            });
            return Promise.all([a1, a2, a3]);
        }
    }).then(() => {
        return Airlines.getModel().countDocuments({});
    }).then((count) => {
        if (count == 0) {
            console.log("Adding some test airline into the database");
            let air1 = Airlines
                .getModel()
                .create({
                _signature: "ITA",
                name: "ITA Airways",
                revenue: 10,
                mail: "ITA.airways@project_flight.it",
                aircrafts: [{ _numAircraft: "1", seats: [{ _numSeat: "A1", class: "Economy", legroom: false, isFree: true }, { _numSeat: "A2", class: "Business", legroom: true, isFree: true }, { _numSeat: "A3", class: "First", legroom: true, isFree: false }], modello: "Boing737" }]
            });
            let air2 = Airlines
                .getModel()
                .create({
                _signature: "LH",
                name: "Lufthansa",
                mail: "lufthansa@project_flight.it",
                revenue: 100,
                aircrafts: [{ _numAircraft: "2", seats: [{ _numSeat: "B1", class: "Business", legroom: true, isFree: false }, { _numSeat: "B2", class: "First", legroom: true, isFree: true }, { _numSeat: "B3", class: "Economy", legroom: false, isFree: false }], modello: "Boing747" }]
            });
            let air3 = Airlines
                .getModel()
                .create({
                _signature: "EK",
                name: "Emirates",
                mail: "emirates@project_flight.it",
                revenue: 100,
                aircrafts: [{ _numAircraft: "3", seats: [{ _numSeat: "C1", class: "First", legroom: true, isFree: true }, { _numSeat: "C2", class: "Economy", legroom: true, isFree: true }, { _numSeat: "C3", class: "Buisness", legroom: false, isFree: true }], modello: "Boing767" }]
            });
            return Promise.all([air1, air2, air3]);
        }
    }).then(() => {
        return Airports.getModel().countDocuments({});
    }).then((count) => {
        if (count == 0) {
            console.log("Adding some test airport into the database");
            let airp1 = Airports
                .getModel()
                .create({
                _code: "011",
                name: "Marco Polo",
                city: "Venice"
            });
            let airp2 = Airports
                .getModel()
                .create({
                _code: "012",
                name: "JFK",
                city: "New York"
            });
            let airp3 = Airports
                .getModel()
                .create({
                _code: "013",
                name: "FCO",
                city: "Rome"
            });
            return Promise.all([airp1, airp2, airp3]);
        }
    }).then(() => {
        return Routes.getModel().countDocuments({});
    }).then((count) => {
        if (count == 0) {
            console.log("Adding some test route into the database");
            let r1 = Routes
                .getModel()
                .create({
                destination: "JFK",
                departure: "VCE",
                layoverFuel: ["FCO"]
            });
            let r2 = Routes
                .getModel()
                .create({
                destination: "FCO",
                departure: "VCE",
            });
            let r3 = Routes
                .getModel()
                .create({
                destination: "JFK",
                departure: "FCO",
            });
            let r4 = Routes
                .getModel()
                .create({
                destination: "VCE",
                departure: "JFK",
                layoverFuel: ["FCO"]
            });
            let r5 = Routes
                .getModel()
                .create({
                destination: "VCE",
                departure: "FCO",
            });
            let r6 = Routes
                .getModel()
                .create({
                destination: "FCO",
                departure: "JFK",
            });
            return Promise.all([r1, r2, r3, r4, r5, r6]);
        }
    }).then(() => {
        return Seats.getModel().countDocuments({});
    }).then((count) => {
        if (count == 0) {
            console.log("Adding some test seat into the database");
            let s1 = Seats
                .getModel()
                .create({
                _numSeat: "A1",
                class: "Economy",
                legroom: false,
                isFree: true
            });
            let s2 = Seats
                .getModel()
                .create({
                _numSeat: "A2",
                class: "Business",
                legroom: true,
                isFree: true
            });
            let s3 = Seats
                .getModel()
                .create({
                _numSeat: "A3",
                class: "First",
                legroom: true,
                isFree: false
            });
            let s4 = Seats
                .getModel()
                .create({
                _numSeat: "B1",
                class: "Business",
                legroom: true,
                isFree: false
            });
            let s5 = Seats
                .getModel()
                .create({
                _numSeat: "B2",
                class: "First",
                legroom: true,
                isFree: true
            });
            let s6 = Seats
                .getModel()
                .create({
                _numSeat: "B3",
                class: "Economy",
                legroom: false,
                isFree: false
            });
            let s7 = Seats
                .getModel()
                .create({
                _numSeat: "C1",
                class: "First",
                legroom: true,
                isFree: true
            });
            let s8 = Seats
                .getModel()
                .create({
                _numSeat: "C2",
                class: "Economy",
                legroom: true,
                isFree: true
            });
            let s9 = Seats
                .getModel()
                .create({
                _numSeat: "C3",
                class: "Buisness",
                legroom: false,
                isFree: true
            });
            return Promise.all([s1, s2, s3, s4, s5, s6, s7, s8, s9]);
        }
    }).then(() => {
        return Flights.getModel().countDocuments({});
    }).then(async (count) => {
        if (count == 0) {
            console.log("Adding some test flight into the database");
            let route1 = await Routes.getModel().findOne({ destination: "JFK", departure: "VCE" });
            let routeid1 = route1._id;
            let route2 = await Routes.getModel().findOne({ destination: "JFK", departure: "FCO" });
            let routeid2 = route2._id;
            let route3 = await Routes.getModel().findOne({ destination: "FCO", departure: "VCE" });
            let routeid3 = route3._id;
            let route4 = await Routes.getModel().findOne({ destination: "VCE", departure: "JFK" });
            let routeid4 = route4._id;
            let route5 = await Routes.getModel().findOne({ destination: "FCO", departure: "JFK" });
            let routeid5 = route5._id;
            let route6 = await Routes.getModel().findOne({ destination: "VCE", departure: "FCO" });
            let routeid6 = route6._id;
            let f1 = Flights
                .getModel()
                .create({
                _flightCode: "AB104",
                dataOra: new Date(2025, 5, 25, 15, 30),
                route: routeid1,
                aircraft: "1",
                duration: 640 //760
            });
            let f2 = Flights
                .getModel()
                .create({
                _flightCode: "AB105",
                dataOra: new Date(2025, 5, 26, 1, 30),
                route: routeid2,
                aircraft: "2",
                duration: 570
            });
            let f3 = Flights
                .getModel()
                .create({
                _flightCode: "AB106",
                dataOra: new Date(2025, 5, 25, 15, 30),
                route: routeid3,
                aircraft: "3",
                duration: 70
            });
            let f4 = Flights
                .getModel()
                .create({
                _flightCode: "AB107",
                dataOra: new Date(2025, 6, 25, 12, 30),
                route: routeid4,
                aircraft: "1",
                duration: 640
            });
            let f5 = Flights
                .getModel()
                .create({
                _flightCode: "AB108",
                dataOra: new Date(2025, 6, 25, 12, 30),
                route: routeid5,
                aircraft: "2",
                duration: 570
            });
            let f6 = Flights
                .getModel()
                .create({
                _flightCode: "AB109",
                dataOra: new Date(2025, 6, 26, 0, 0),
                route: routeid6,
                aircraft: "3",
                duration: 70
            });
            return Promise.all([f1, f2, f3, f4, f5, f6]);
        }
    }).then(() => {
        let server = http.createServer(app);
        ios = io(server, {
            cors: {
                origin: "http://localhost:4200"
            }
        });
        ios.on('connection', function (client) {
            console.log("Socket.io client connected".green);
        });
        server.listen(8080, () => console.log("HTTP Server started on port 8080".green));
    }).catch((err) => {
        console.log("Error Occurred during initialization".red);
        console.log(err);
    });
}
//# sourceMappingURL=Inizializzazione.js.map