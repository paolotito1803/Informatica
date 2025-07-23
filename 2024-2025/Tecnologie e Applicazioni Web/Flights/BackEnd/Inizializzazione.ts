import mongoose = require("mongoose");
import http = require("http");


const io = require("socket.io");
import * as Users from "./Users";
import * as Tickets from "./Tickets";
import * as Aircrafts from "./Aircrafts"
import * as Airlines from "./Airlines";
import * as Airports from "./Airports";
import * as Routes from "./Routes";
import * as Seats from "./Seats";
import * as Flights from "./Flights";
import { promises } from "dns";

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
        (count) => { //dati di test per gli users
            if (count-1 == 0) {
                console.log("Adding some test users into the database");
                let m1 = Users.newUser({
                    username: "micbos71",
                    passportID: "KS2718281",
                    mail: "mic.bos.71@project_flight.it",
                    roles: "passenger",
                    tickets : []
                });
                m1.setPassword("123456");
                //m1.save();
                let m2 = Users.newUser({
                    username: "bordjack47",
                    passportID: "VY3141592",
                    mail: "bordjack47@project_flight.it",
                    roles: "passenger",
                    tickets : []
                });
                m2.setPassword("7891011");
                //m2.save();
                let m3 = Users.newUser({
                    username: "tito_paul",
                    passportID: "GK1618033",
                    mail: "paul.tito@project_flight.it",
                    roles: "passenger",
                    tickets : []
                });
                m3.setPassword("abdef");
                //m3.save();
                let m4 = Users.newUser({
                    username: "lufthansa",
                    passportID : "AB12345",
                    mail: "lufthansa@project_flight.it",
                    roles : "airline",
                    tickets : []
                });
                m4.setPassword("prova");
                //m4.save();
                let m5 = Users.newUser({
                    username: "emirates",
                    passportID : "EM6754",
                    mail: "emirates@project_flight.it",
                    roles : "airline",
                    tickets : []
                });
                m5.setPassword("ek12345");
                //m5.save();
                let m6 = Users.newUser({
                    username: "ITA Airways",
                    passportID : "IT2025",
                    mail: "ITA.airways@project_flight.it",
                    roles : "airline",
                    tickets : []
                });
                m6.setPassword("provaI");
                //m6.save();

                return Promise.all([m1.save(), m2.save(), m3.save(), m4.save(), m5.save(), m6.save()]);
            }
        }).then(() => {
            return Aircrafts.getModel().countDocuments({})
        }
        ).then( (count) => { //dati di test per gli aircrafts
            if (count == 0) {
                console.log("Adding some test aircraft into the database");
                let a1 = Aircrafts
                    .getModel()
                    .create({
                       _numAircraft : "1", 
                       seats: [{_numSeat : "A1", class : "Economy", legroom : false, isFree : true}, 
                               {_numSeat : "A2", class : "Business", legroom : true, isFree : true}, 
                               {_numSeat : "A3", class : "First", legroom : true, isFree : false}], 
                        modello : "Boing737"
                    });
                let a2 = Aircrafts
                    .getModel()
                    .create({
                        _numAircraft : "2", 
                        seats: [{_numSeat : "B1", class : "Business", legroom : true, isFree : false}, 
                                {_numSeat : "B2", class : "First", legroom : true, isFree : true}, 
                                {_numSeat : "B3", class : "Economy", legroom : false, isFree : false}], 
                        modello : "Boing747"
                    });
                    let a3 = Aircrafts
                    .getModel()
                    .create({
                       _numAircraft : "3", 
                       seats: [{_numSeat : "C1", class : "First", legroom : true, isFree : true}, 
                               {_numSeat : "C2", class : "Economy", legroom : true, isFree : true}, 
                               {_numSeat : "C3", class : "Business", legroom : false, isFree : true}], 
                        modello : "Boing767"
                    });
                    let a4 = Aircrafts
                    .getModel()
                    .create({
                       _numAircraft : "4", 
                       seats: [{_numSeat : "A1", class : "Economy", legroom : false, isFree : true}, 
                               {_numSeat : "A2", class : "Business", legroom : true, isFree : true}, 
                               {_numSeat : "A3", class : "First", legroom : false, isFree : false}], 
                        modello : "Boing737"
                    });
                let a5 = Aircrafts
                    .getModel()
                    .create({
                        _numAircraft : "5", 
                        seats: [{_numSeat : "B1", class : "Business", legroom : true, isFree : false}, 
                                {_numSeat : "B2", class : "First", legroom : true, isFree : true}, 
                                {_numSeat : "B3", class : "Economy", legroom : false, isFree : true}], 
                        modello : "Boing747"
                    });
                    let a6 = Aircrafts
                    .getModel()
                    .create({
                       _numAircraft : "6", 
                       seats: [{_numSeat : "C1", class : "First", legroom : true, isFree : true}, 
                               {_numSeat : "C2", class : "Economy", legroom : true, isFree : true}, 
                               {_numSeat : "C3", class : "Business", legroom : true, isFree : true}], 
                        modello : "Boing767"
                    });
                return Promise.all([a1, a2, a3, a4, a5, a6]);
            }
        }).then(() => {
                return Airlines.getModel().countDocuments({})
        }
        ).then( (count) => { //dati di test per le airlines
            if (count == 0) {
                console.log("Adding some test airline into the database");
                let air1 = Airlines
                    .getModel()
                    .create({
                       _signature : "ITA",
                       name : "ITA Airways",
                       revenue : 10,
                       mail : "ITA.airways@project_flight.it",
                       aircrafts : [{_numAircraft : "1", seats: [{_numSeat : "A1", class : "Economy", legroom : false, isFree : false}, {_numSeat : "A2", class : "Business", legroom : true, isFree : true}, {_numSeat : "A3", class : "First", legroom : true, isFree : false}], modello : "Boing737"},
                                    {_numAircraft : "4", seats: [{_numSeat : "A1", class : "Economy", legroom : false, isFree : true}, {_numSeat : "A2", class : "Business", legroom : true, isFree : true}, {_numSeat : "A3", class : "First", legroom : false, isFree : false}], modello : "Boing737"}]
                    });
                let air2 = Airlines
                    .getModel()
                    .create({
                       _signature : "LH",
                       name : "Lufthansa",
                       mail : "lufthansa@project_flight.it",
                       revenue : 100,
                       aircrafts : [{_numAircraft : "2", seats: [{_numSeat : "B1", class : "Business", legroom : true, isFree : false}, {_numSeat : "B2", class : "First", legroom : true, isFree : false}, {_numSeat : "B3", class : "Economy", legroom : false, isFree : false}], modello : "Boing747"},
                                    {_numAircraft : "5", seats: [{_numSeat : "B1", class : "Business", legroom : true, isFree : false}, {_numSeat : "B2", class : "First", legroom : true, isFree : true}, {_numSeat : "B3", class : "Economy", legroom : false, isFree : true}], modello : "Boing747"}]
                    });
                    let air3 = Airlines
                    .getModel()
                    .create({
                       _signature : "EK",
                       name : "Emirates",
                       mail : "emirates@project_flight.it",
                       revenue : 100,
                       aircrafts : [{_numAircraft : "3", seats: [{_numSeat : "C1", class : "First", legroom : true, isFree : true}, {_numSeat : "C2", class : "Economy", legroom : true, isFree : true}, {_numSeat : "C3", class : "Business", legroom : false, isFree : true}], modello : "Boing767"},
                                    {_numAircraft : "6", seats: [{_numSeat : "C1", class : "First", legroom : true, isFree : true}, {_numSeat : "C2", class : "Economy", legroom : true, isFree : true}, {_numSeat : "C3", class : "Business", legroom : true, isFree : true}], modello : "Boing767"}]
                    });
                return Promise.all([air1, air2, air3]);
            }
        }).then(() => {
                return Airports.getModel().countDocuments({})
        }
        ).then( (count) => { //dati di test per gli airports
            if (count == 0) {
                console.log("Adding some test airport into the database");
                let airp1 = Airports
                    .getModel()
                    .create({
                       _code : "011",
                       name : "Marco Polo",
                       city : "Venice"
                    });
                let airp2 = Airports
                    .getModel()
                    .create({
                       _code : "012",
                       name : "JFK",
                       city : "New York"
                    });
                let airp3 = Airports
                .getModel()
                .create({
                    _code : "013",
                    name : "FCO",
                    city : "Rome"
                });
                return Promise.all([airp1, airp2, airp3]);
            }
        }).then(() => {
                return Routes.getModel().countDocuments({})
        }
        ).then( (count) => { //dati di test per le routes
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
                let r4 = Routes
                    .getModel()
                    .create({
                       destination : "VCE",
                       departure : "JFK",
                       layoverFuel : ["FCO"]
                    });
                let r5 = Routes
                    .getModel()
                    .create({
                        destination : "VCE",
                        departure : "FCO",
                    });
                let r6 = Routes
                    .getModel()
                    .create({
                        destination : "FCO",
                        departure : "JFK",
                    });
                return Promise.all([r1, r2, r3, r4, r5, r6]);
            }
        }).then(() => {
                return Seats.getModel().countDocuments({})
        }
        ).then( (count) => { //dati di test per i seats
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
                let s4 = Seats
                .getModel()
                .create({
                    _numSeat : "B1", 
                    class : "Business", 
                    legroom : true, 
                    isFree : false
                });
                let s5 = Seats
                .getModel()
                .create({
                    _numSeat : "B2", 
                    class : "First", 
                    legroom : true, 
                    isFree : true
                }); 
                let s6 = Seats
                .getModel()
                .create({
                    _numSeat : "B3", 
                    class : "Economy", 
                    legroom : false, 
                    isFree : false
                }); 
                let s7 = Seats
                .getModel()
                .create({
                    _numSeat : "C1", 
                    class : "First", 
                    legroom : true, 
                    isFree : true
                });
                let s8 = Seats
                .getModel()
                .create({
                    _numSeat : "C2", 
                    class : "Economy", 
                    legroom : true, 
                    isFree : true
                }); 
                let s9 = Seats
                .getModel()
                .create({
                    _numSeat : "C3", 
                    class : "Business", 
                    legroom : false, 
                    isFree : true
                });
                return Promise.all([s1, s2, s3, s4, s5, s6, s7, s8, s9]);
            }
        }).then(() => {
            return Flights.getModel().countDocuments({})
        }
        ).then( async (count) => { // dati di test per i voli
            if (count == 0) {
                console.log("Adding some test flight into the database");
                let route1 = await Routes.getModel().findOne({destination : "JFK", departure : "VCE"});
                let routeid1 = route1._id
                let route2 = await Routes.getModel().findOne({destination : "JFK", departure : "FCO"});
                let routeid2 = route2._id;
                let route3 = await Routes.getModel().findOne({destination : "FCO", departure : "VCE"});
                let routeid3 = route3._id;
                let route4 = await Routes.getModel().findOne({destination : "VCE", departure : "JFK"});
                let routeid4 = route4._id
                let route5 = await Routes.getModel().findOne({destination : "FCO", departure : "JFK"});
                let routeid5 = route5._id;
                let route6 = await Routes.getModel().findOne({destination : "VCE", departure : "FCO"});
                let routeid6 = route6._id;
                let f1 = Flights
                    .getModel()
                    .create({
                        _flightCode : "AB104",
                        dataOra : new Date(2025, 5, 25, 15, 30),
                        route : routeid1,
                        aircraft : "1",
                        duration : 640 //760
                    });
                let f2 = Flights
                    .getModel()
                    .create({
                        _flightCode : "AB105",
                        dataOra : new Date(2025, 5, 26, 1, 30),
                        route : routeid2,
                        aircraft : "2",
                        duration : 570
                    });
                let f3 = Flights
                .getModel()
                .create({
                        _flightCode : "AB106",
                        dataOra : new Date(2025, 5, 25, 15, 30),
                        route : routeid3,
                        aircraft : "3",
                        duration : 70
                });
                let f4 = Flights
                    .getModel()
                    .create({
                        _flightCode : "AB107",
                        dataOra : new Date(2025, 6, 25, 12, 30),
                        route : routeid4,
                        aircraft : "4",
                        duration : 640
                    });
                let f5 = Flights
                    .getModel()
                    .create({
                        _flightCode : "AB108",
                        dataOra : new Date(2025, 6, 25, 12, 30),
                        route : routeid5,
                        aircraft : "5",
                        duration : 570
                    });
                let f6 = Flights
                .getModel()
                .create({
                        _flightCode : "AB109",
                        dataOra : new Date(2025, 6, 26, 0, 0),
                        route : routeid6,
                        aircraft : "6",
                        duration : 70
                });
                return Promise.all([f1, f2, f3, f4, f5, f6]);
            }
        }).then(() => {
            return Tickets.getModel().countDocuments({})
        }).then( async (count) => { //dati di test per i tickets
            if (count == 0) {
                console.log("Adding some test ticket into the database");

                // Recupera utenti
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

                // Recupera voli
                const flights = await Flights.getModel().find({});
                const aircraftMap = new Map();
                for (const f of flights) {
                    const aircraft = await Aircrafts.getModel().findOne({ _numAircraft: f.aircraft });
                    if (!aircraft) continue;
                    aircraftMap.set(f._flightCode, aircraft);
                }

                // Funzione per determinare il prezzo
                const getPriceFromClass = (seatClass) => {
                    switch (seatClass.toLowerCase()) {
                        case "economy": return 10;
                        case "business": return 30;
                        case "first": return 50;
                        default: return 20;
                    }
                };

                const createTicket = async (user, flightCode, seatCode, numBag, code) => {
                    const aircraft = aircraftMap.get(flightCode);
                    if (!aircraft) return;

                    const seat = aircraft.seats.find(s => s._numSeat === seatCode);
                    if (!seat) {
                        console.warn(`Seat ${seatCode} non trovato per il volo ${flightCode}`);
                        return;
                    }

                    const price = getPriceFromClass(seat.class);
                    const ticket = await Tickets.getModel().create({
                        user: user._id,
                        seat: seat._numSeat,
                        flight: flightCode,
                        price: price,
                        numBag: numBag,
                        _code: code
                    });

                    user.tickets.push(ticket);
                    return user.save();
                };

                // Associazioni [utente, flightCode, seatCode, numBag, codice]
                const biglietti = [
                    [users[0], "AB104", "A2", 1, "1"],
                    [users[1], "AB105", "B3", 2, "2"],
                    [users[2], "AB106", "C3", 3, "3"],
                    [users[3], "AB107", "A2", 1, "4"],
                    [users[3], "AB107", "A3", 2, "5"],
                    [users[3], "AB107", "A1", 3, "6"],
                    [users[3], "AB104", "A3", 1, "7"],
                    [users[3], "AB104", "A1", 2, "8"],
                    [users[4], "AB108", "B1", 1, "9"],
                    [users[4], "AB108", "B2", 2, "10"],
                    [users[4], "AB108", "B3", 3, "11"],
                    [users[4], "AB105", "B1", 1, "12"],
                    [users[4], "AB105", "B2", 2, "13"],
                    [users[5], "AB109", "C1", 3, "14"],
                    [users[5], "AB109", "C2", 3, "15"],
                    [users[5], "AB109", "C3", 3, "16"],
                    [users[5], "AB106", "C1", 3, "17"],
                    [users[5], "AB106", "C2", 3, "18"]
                ];

                for (const [user, flight, seat, numBag, code] of biglietti) {
                    await createTicket(user, flight, seat, numBag, code);
                }
            }
            /*if (count == 0) {
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

                let seat = await Seats.getModel().find({});
                let seatClassMap = new Map();
                seat.forEach(seat => seatClassMap.set(seat._numSeat, seat.class));

                // Funzione per determinare il prezzo
                const getPriceFromClass = (seatClass) => {
                    switch (seatClass.toLowerCase()) {
                        case "economy": return 10;
                        case "business": return 30;
                        case "first": return 50;
                        default: return 20;
                    }
                };

                const createTicket = async (user, seatCode, flightCode, numBag, code) => {
                    const seatClass = seatClassMap.get(seatCode) || "economy";
                    const price = getPriceFromClass(seatClass);
                    const ticket = await Tickets.getModel().create({
                        user: user._id,
                        seat: seatCode,
                        flight: flightCode,
                        price: price,
                        numBag: numBag,
                        _code: code
                    });
                    user.tickets.push(ticket);
                    return user.save();
                };

                let biglietti = [
                    [u1, "B1", "AB104", 1, "1"],
                    [u2, "C2", "AB105", 2, "2"],
                    [u3, "A3", "AB106", 3, "3"],
                    [u4, "B1", "AB107", 1, "4"],
                    [u4, "B2", "AB107", 2, "5"],
                    [u4, "B3", "AB107", 3, "6"],
                    //createTicket(u4, "B1", "AB104", 1, "1"),
                    [u4, "B2", "AB104", 2, "7"],
                    [u4, "B3", "AB104", 3, "8"],
                    [u5, "C1", "AB108", 1, "9"],
                    [u5, "C2", "AB108", 2, "10"],
                    [u5, "C3", "AB108", 3, "11"],
                    [u5, "C1", "AB105", 1, "12"],
                    //createTicket(u5, "C2", "AB105", 2, "2"),
                    [u5, "C3", "AB105", 3, "13"],
                    [u6, "A1", "AB109", 3, "14"],
                    [u6, "A2", "AB109", 3, "15"],
                    [u6, "A3", "AB109", 3, "16"],
                    [u6, "A1", "AB106", 3, "17"],
                    [u6, "A2", "AB106", 3, "18"]
                    //createTicket(u6, "A3", "AB106", 3, "3")
                ];
                for (const [user, seat, flight, numBag, code] of biglietti) { 
                    await createTicket(user, seat, flight, numBag, code);
                }
            }*/
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
        }
    ).catch(
        (err) => {
            console.log("Error Occurred during initialization".red);
            console.log(err);
        }
    );
}