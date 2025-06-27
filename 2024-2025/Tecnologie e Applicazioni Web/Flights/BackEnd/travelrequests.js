"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result = require('dotenv').config();
if (result.error) {
    console.log("Unable to load \".env\" file. Please provide one to store the JWT secret key");
    process.exit(-1);
}
if (!process.env.JWT_SECRETS) {
    console.log("\".env\" file loaded but JWT_SECRETS=<secret> key-value pair was not found");
    process.exit(-1);
}
const colors = require("colors");
colors.enabled = true;
const users = require("./Users");
const routes = require("./Routes");
const airlines = require("./Airlines");
const aircrafts = require("./Aircrafts");
const flights = require("./Flights");
const seats = require("./Seats");
const tickets = require("./Tickets");
const airports = require("./Airports");
const express = require("express");
const passport = require("passport"); // authentication middleware for Express
const passportHTTP = require("passport-http"); // implements Basic and Digest authentication for HTTP (used for /login endpoint)
const jsonwebtoken = require("jsonwebtoken"); // JWT generation
const cors = require("cors"); // Enable CORS middleware
const Inizializzazione_1 = require("./Inizializzazione");
const io = require('socket.io'); // Socket.io websocket library
const { expressjwt: jwt } = require('express-jwt'); // JWT parsing middleware for express
let app = express();
let auth = jwt({
    secret: process.env.JWT_SECRETS,
    algorithms: ["HS256"]
});
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log("------------------------------------------------".inverse);
    console.log("New request for: " + req.url);
    console.log("Method: " + req.method);
    next();
});
(0, Inizializzazione_1.Inizializzazione)(app);
app.get("/", (req, res) => {
    res.status(200).json({ api_version: "1.0",
        endpoints: ["/users", "/airlines", "/login", "/search", "/seats", "/aircrafts", "/airports", "/routes", "/flights", "/tickets"]
    }); // json method sends a JSON response (setting the correct Content-Type) to the client
});
/*
Utenti -> users:
login -> get            FATTO
registrazione -> post   FATTO
delete -> del           FATTO
modifica dati -> put    FATTO
 */
passport.use(new passportHTTP.BasicStrategy(function (username, password, done) {
    console.log("New login attempt from ".green + username);
    users.getModel().findOne({ mail: username }).then((user) => {
        if (!user) {
            return done(null, false, { statusCode: 500, error: true, errormessage: "Invalid user" });
        }
        if (user.validatePassword(password)) {
            return done(null, user);
        }
        return done(null, false, { statusCode: 500, error: true, errormessage: "Invalid password" });
    }).catch((err) => {
        return done({ statusCode: 500, error: true, errormessage: err });
    });
}));
app.get("/login", passport.authenticate('basic', { session: false }), (req, res, next) => {
    if (req.user.mustChangePassword) {
        return res.status(403).json({ error: true, errormessage: "Password change required before access", mustChangePassword: true });
    }
    let tokendata = {
        username: req.user.username,
        passportID: req.user.passportID,
        roles: req.user.roles,
        mail: req.user.mail,
        id: req.user.id
    };
    console.log("Login granted. Generating token");
    let token_signed = jsonwebtoken.sign(tokendata, process.env.JWT_SECRETS, { expiresIn: '1h' });
    return res.status(200).json({ error: false, errormessage: "", token: token_signed });
});
//signup user
app.post('/users', (req, res, next) => {
    let u = users.newUser(req.body);
    if (!req.body.password) {
        return next({ statusCode: 400, error: true, errormessage: "Password field missing" });
    }
    u.setPassword(req.body.password);
    u.save().then((data) => {
        return res.status(200).json({ error: false, errormessage: "", id: data._id });
    }).catch((reason) => {
        if (reason.code === 11000)
            return next({ statusCode: 409, error: true, errormessage: "User already exists" });
        return next({ statusCode: 404, error: true, errormessage: "DB error: " + reason.errmsg });
    });
});
//delete user
app.delete('/users/:id', auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasAdminRole()) {
        return next({ statusCode: 404, error: true, errormessage: "Unauthorized: user is not an administrator." });
    }
    users.getModel().deleteOne({ _id: req.params.id }).then((q) => {
        if (q.deletedCount > 0)
            return res.status(200).json({ error: false, errormessage: "" });
        else
            return res.status(404).json({ error: true, errormessage: "Invalid user ID" });
    }).catch((reason) => {
        return next({ statusCode: 404, error: true, errormessage: "DB error: " + reason });
    });
});
//user data modifications
/*
Into the profile page, the user may alter its data such as:
- password
- username
 */
app.put('/users/:id', auth, async (req, res, next) => {
    try {
        const userId = req.params.id;
        const u = await users.getModel().findById(userId);
        //Checks if both password and username are not empty fields
        if (!req.body.password && !req.body.username && !req.body.mail && !req.body.passportID) {
            return next({ statusCode: 400, error: true, errormessage: "At least one field must be provided" });
        }
        //If the user wants to update password
        if (req.body.password) {
            u.setPassword(req.body.password); // Dovresti hashare la password prima di salvarla
        }
        //If the user wants to update username
        if (req.body.username) {
            u.username = req.body.username;
        }
        if (req.body.mail) {
            u.mail = req.body.mail;
        }
        if (req.body.passportID) {
            u.passportID = req.body.passportID;
        }
        //Finds the user we want to update and do it
        const updatedUser = users.getModel().findByIdAndUpdate(userId, u, { new: true }).then(() => {
            return res.status(200).json({ error: false, errormessage: "", id: updatedUser._id });
        }).catch(() => {
            return next({ statusCode: 404, error: true, errormessage: "User not found." });
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});
/*
    Routes
    In this section we have to insert/update/delete routes.
    Note: only an airline may insert a route!
    Steps:
    - insert -> POST    FATTO
    - update -> PUT     FATTO
    - delete -> DEL     FATTO
 */
app.post('/routes', auth, (req, res, next) => {
    let r = routes.newRoute(req.body);
    let a = users.newUser(req.auth).hasAirlineRole();
    if (a) {
        r.save().then((data) => {
            return res.status(200).json({ error: false, errormessage: "", id: data._id });
        }).catch((reason) => {
            if (reason.code === 11000)
                return next({ statusCode: 404, error: true, errormessage: "Route already exists" });
            return next({ statusCode: 404, error: true, errormessage: "DB error: " + reason.errmsg });
        });
    }
    else {
        console.error("Not admin, impossible insert");
        return next({ statusCode: 403, error: true, errormessage: "Unauthorized, you are not an Airline" });
    }
});
app.put('/routes/:id', auth, async (req, res, next) => {
    try {
        const userId_routes = req.params.id;
        const r = await routes.getModel().findById(userId_routes);
        if (!req.body.depart && !req.body.destination && !req.body.layoverFuel) {
            return next({ statusCode: 400, error: true, errormessage: "At least one field must be provided" });
        }
        if (req.body.destination) {
            r.destination = req.body.destination;
        }
        if (req.body.depart) {
            r.departure = req.body.depart;
        }
        if (req.body.layoverFuel) {
            r.layoverFuel = req.body.layoverFuel;
        }
        //Finds the routes we want to update and do it
        const updatedRoute = routes.getModel().findByIdAndUpdate(userId_routes, r, { new: true }).then(() => {
            return res.status(200).json({ error: false, errormessage: "", id: updatedRoute._id });
        }).catch(() => {
            return next({ statusCode: 404, error: true, errormessage: "Route not found." });
        });
    }
    catch (error) {
        console.error("Error updating route:", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});
app.delete('/routes/:id', auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasAirlineRole()) {
        return next({ statusCode: 404, error: true, errormessage: "Unauthorized: user is not an administrator." });
    }
    routes.getModel().deleteOne({ _id: req.params.id }).then((q) => {
        if (q.deletedCount > 0)
            return res.status(200).json({ error: false, errormessage: "" });
        else
            return res.status(404).json({ error: true, errormessage: "Invalid route ID" });
    }).catch((reason) => {
        return next({ statusCode: 404, error: true, errormessage: "DB error: " + reason });
    });
});
app.get('/routes', auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasAirlineRole())
        return next({ statuscode: 403, error: true, errormessage: "Unauthorized" });
    routes.getModel().find({}).then((routes) => {
        return res.status(200).json(routes);
    }).catch((reason) => {
        return next({ statuscode: 404, error: true, errormessage: "DB error" + reason });
    });
});
/*
    Airlines
    Steps:
    - select -> GET     FATTO
    - insert -> POST    FATTO
    - update -> PUT     FATTO
    - delete -> DEL     FATTO
 */
app.get("/airlines/:mail", auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasAirlineRole()) {
        return next({ statusCode: 403, error: true, errormessage: "Unauthorized" });
    }
    else {
        airlines.getModel().find({ mail: req.auth.mail }).then((airline) => {
            return res.status(201).json({ airline });
        }).catch((err) => { return next({ statusCode: 400, error: true, errormessage: "Error mail" }); });
    }
});
app.post("/airlines", auth, async (req, res, next) => {
    if (!users.newUser(req.auth).hasAdminRole()) {
        return next({ statusCode: 403, error: true, errormessage: "Unauthorized" });
    }
    const { name, mail, aircrafts, tempPassword } = req.body;
    if (!tempPassword) {
        return next({ statusCode: 400, error: true, errormessage: "Temporary password is required" });
    }
    const airlineModel = airlines.newAirline({
        name,
        mail,
        aircrafts,
        _signature: "signed-by-admin",
        mustChangePassword: true
    });
    airlineModel.setAirlinePassword(tempPassword);
    try {
        const savedAirline = await airlineModel.save();
        return res.status(201).json({ error: false, id: savedAirline._signature });
    }
    catch (err) {
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + err.message });
    }
});
app.put('/airlines/:id', auth, async (req, res, next) => {
    try {
        const mail_airline = req.params.id;
        const ar = await airlines.getModel().findOne({ mail: mail_airline });
        //Checks if both password and username are not empty fields
        if (!req.body.name && !req.body.revenue && !req.body.aircrafts) {
            return next({ statusCode: 400, error: true, errormessage: "At least one field must be provided" });
        }
        //If the airline wants to update password
        if (req.body.name) {
            ar.setName(req.body.name);
        }
        //If the airline wants to update username
        if (req.body.revenue) {
            ar.setRevenue(req.body.revenue);
        }
        if (req.body.aircrafts) {
            ar.setAircrafts(req.body.aircrafts);
        }
        //Finds the airline we want to update and do it
        const updatedAirline = airlines.getModel().findOneAndUpdate({ mail: mail_airline }, ar).then(() => {
            return res.status(200).json({ error: false, errormessage: "", id: updatedAirline.mail });
        }).catch(() => {
            return next({ statusCode: 404, error: true, errormessage: "Airline not found." });
        });
    }
    catch (error) {
        console.error("Error updating Airline:", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});
app.put("/airlines/:id/setup", auth, async (req, res, next) => {
    try {
        const airline = await airlines.getModel().findOne({ mail: req.params.id });
        if (!airline) {
            return next({ statusCode: 404, error: true, errormessage: "Airline not found" });
        }
        // Only the airline itself can update its setup
        if (!users.newUser(req.auth).hasAirlineRole()) {
            return next({ statusCode: 403, error: true, errormessage: "Unauthorized" });
        }
        const { password, name, mail, aircrafts } = req.body;
        if (!password && !name && !mail && !Array.isArray(aircrafts) && aircrafts.length === 0) {
            return next({
                statusCode: 400,
                error: true,
                errormessage: "All fields (password, name, mail, aircrafts) are required"
            });
        }
        if (password) {
            airline.setAirlinePassword(password);
            airline.mustChangePassword = false;
            let user = await users.getModel().findOne({ mail: req.auth.mail });
            user.setPassword(password);
            await user.save();
        }
        if (name)
            airline.name = name;
        if (mail)
            airline.mail = mail;
        if (aircrafts)
            airline.aircrafts = aircrafts;
        await airline.save();
        return res.status(200).json({ error: false, message: "Airline setup completed" });
    }
    catch (err) {
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + err.message });
    }
});
app.delete('/airlines/:id', auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasAdminRole()) {
        return next({ statusCode: 404, error: true, errormessage: "Unauthorized: user is not an administrator." });
    }
    airlines.getModel().deleteOne({ _signature: req.params.id }).then((q) => {
        if (q.deletedCount > 0)
            return res.status(200).json({ error: false, errormessage: "" });
        else
            return res.status(404).json({ error: true, errormessage: "Invalid airline signature" });
    }).catch((reason) => {
        return next({ statusCode: 404, error: true, errormessage: "DB error: " + reason });
    });
});
/*
    Aircrafts
    Steps:
    - insert -> POST    FATTO
    - update -> PUT     FATTO
    - delete -> DEL     FATTO
    - search -> GET     FATTO
 */
app.post('/aircrafts', auth, (req, res, next) => {
    let u = users.newUser(req.auth).hasAirlineRole();
    let aircraft = aircrafts.newAircraft(req.body);
    if (u) {
        aircraft.save().then((data) => {
            return res.status(200).json({ error: false, errormessage: "", id: data._numAircraft });
        }).catch((reason) => {
            if (reason.code === 11000)
                return next({ statusCode: 404, error: true, errormessage: "Aircraft already exists" });
            return next({ statusCode: 404, error: true, errormessage: "DB error: " + reason.errmsg });
        });
        airlines.getModel().findOne({ mail: req.auth.mail }).then((doc) => {
            doc.aircrafts.push(aircraft);
            doc.save();
        });
    }
    else {
        console.error("Not airline, impossible insert");
        return next({ statusCode: 404, error: true, errormessage: "Unauthorized, you are not an admin" });
    }
});
app.put('/aircrafts/:id', auth, async (req, res, next) => {
    try {
        const userId_aircrafts = req.params.id;
        const aircraft = await aircrafts.getModel().findOne({ _numAircraft: userId_aircrafts });
        if (users.newUser(req.auth).hasAirlineRole()) {
            if (!req.body.modello && !req.body.seats) {
                return next({ statusCode: 400, error: true, errormessage: "At least one field must be provided" });
            }
            if (req.body.modello) {
                aircraft.modello = req.body.modello;
            }
            if (req.body.seats) {
                aircraft.seats = req.body.seats;
            }
            const updatedAircraft = aircrafts.getModel().findOneAndUpdate({ _numAircraft: userId_aircrafts }, aircraft).then(() => {
                return res.status(200).json({ error: false, errormessage: "", id: updatedAircraft._numAircraft });
            }).catch(() => {
                return next({ statusCode: 404, error: true, errormessage: "Aircraft not found." });
            });
        }
    }
    catch (error) {
        console.error("Error updating Aircraft:", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});
app.delete('/aircrafts/:id', auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasAirlineRole()) {
        return next({ statusCode: 404, error: true, errormessage: "Unauthorized: user is not an administrator." });
    }
    aircrafts.getModel().deleteOne({ _numAircraft: req.params.id }).then((q) => {
        if (q.deletedCount > 0)
            return res.status(200).json({ error: false, errormessage: "" });
        else
            return res.status(404).json({ error: true, errormessage: "Invalid aircraft ID" });
    }).catch((reason) => {
        return next({ statusCode: 404, error: true, errormessage: "DB error: " + reason });
    });
});
app.get('/aircrafts', auth, (req, res, next) => {
    aircrafts.getModel().find({}, {}).then((aircrafts) => {
        return res.status(200).json(aircrafts);
    }).catch((reason) => {
        return next({ statuscode: 404, error: true, errormessage: "DB error" + reason });
    });
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
    if (!users.newUser(req.auth).hasAirlineRole()) {
        return next({ statuscode: 403, error: true, errormessage: "Unauthorized." });
    }
    else {
        let f = flights.newFlight(req.body);
        f.save().then((data) => {
            return res.status(200).json({ error: false, errormessage: '', id: data._flightCode });
        }).catch((reason) => {
            if (reason.code === 11000) {
                return next({ statuscode: 409, error: true, errormessage: "Flight already exists" });
            }
            else {
                return next({ statudcode: 404, error: true, errormessage: "DB error" + reason.errmsg });
            }
        });
    }
});
app.get('/flights', (req, res, next) => {
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
app.delete('/flights/:id', auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasAirlineRole()) {
        return next({ statuscode: 403, error: true, errormessage: "Unauthorized" });
    }
    else {
        flights.getModel().deleteOne({ _flightCode: req.params.id }).then((q) => {
            if (q.deletedCount > 0)
                return res.status(200).json({ error: false, errormessage: "" });
            else
                return res.status(404).json({ error: true, errormessage: "Flight with flightCode" + req.params.id + "not found" });
        }).catch((reason) => {
            return next({ statuscode: 404, error: true, errormessage: "DB error" + reason });
        });
    }
});
app.put('/flights/:id', auth, async (req, res, next) => {
    try {
        const userId_flights = req.params.id;
        const flight = await flights.getModel().findOne({ _flightCode: userId_flights });
        if (users.newUser(req.auth).hasAirlineRole()) {
            if (!req.body.dataOra && !req.body.aircraft && !req.body.route && !req.body.duration) {
                return next({ statusCode: 400, error: true, errormessage: "At least one field must be provided" });
            }
            if (req.body.aircraft) {
                flight.aircraft = req.body.aircraft;
            }
            if (req.body.route) {
                flight.route = req.body.route;
            }
            if (req.body.dataOra) {
                flight.dataOra = req.body.dataOra;
            }
            if (req.body.duration)
                flight.duration = req.body.duration;
            const updatedFlight = flights.getModel().findOneAndUpdate({ _flightCode: userId_flights }, flight).then(() => {
                return res.status(200).json({ error: false, errormessage: "", id: updatedFlight._flightCode });
            }).catch(() => {
                return next({ statusCode: 404, error: true, errormessage: "Flight not found." });
            });
        }
    }
    catch (error) {
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
app.post('/tickets', auth, async (req, res, next) => {
    const user = users.newUser(req.auth);
    try {
        if (user.hasAirlineRole()) {
            // L'airline crea un biglietto e lo salva nel proprio array
            const ticket = tickets.newTicket(req.body);
            await ticket.save();
            const airlineUser = await users.getModel().findOne({ mail: req.auth.mail });
            airlineUser.tickets.push(ticket);
            await airlineUser.save();
            return res.status(200).json({ error: false, errormessage: "", id: ticket._code });
        }
        if (user.hasPassangerRole()) {
            // Il passeggero compra un biglietto da un airline
            const airlineUser = await users.getModel().findOne({ roles: 'airline', tickets: { $exists: true, $not: { $size: 0 } } });
            if (!airlineUser || airlineUser.tickets.length === 0)
                return next({ statuscode: 404, error: true, errormessage: "No available tickets from airlines" });
            const ticketRef = airlineUser.tickets.pop();
            await airlineUser.save();
            const ticket = await tickets.getModel().findOne({ _code: ticketRef._code });
            if (!ticket)
                return next({ statuscode: 404, error: true, errormessage: "Ticket not found in DB" });
            const passengerUser = await users.getModel().findOne({ mail: req.auth.mail });
            ticket.user = passengerUser._id;
            await ticket.save();
            passengerUser.tickets.push(ticket);
            await passengerUser.save();
            const seat = await seats.getModel().findOne({ _numSeat: ticket.seat });
            if (seat) {
                seat.setIsFree();
                await seat.save();
            }
            return res.status(200).json({ error: false, errormessage: '', id: ticket._code });
        }
        return next({ statuscode: 403, error: true, errormessage: "Unauthorized" });
    }
    catch (error) {
        return next({ statuscode: 500, error: true, errormessage: "Internal error: " + error.message });
    }
});
app.get('/tickets', auth, async (req, res, next) => {
    if (!users.newUser(req.auth).hasAirlineRole() && !users.newUser(req.auth).hasPassangerRole())
        return next({ statuscode: 403, error: true, errormessage: "Unauthorized." });
    let u = await users.getModel().findOne({ mail: req.auth.mail });
    tickets.getModel().find({ user: u._id }).then((tickets) => {
        return res.status(200).json(tickets);
    }).catch((reason) => {
        return next({ statuscode: 404, error: true, errormessage: "DB error" + reason });
    });
});
app.delete('/tickets/:id', auth, async (req, res, next) => {
    if (!users.newUser(req.auth).hasPassangerRole()) {
        return next({ statuscode: 403, error: true, errormessage: "Unauthorized" });
    }
    try {
        const ticket = await tickets.getModel().findOne({ _code: req.params.id });
        if (!ticket) {
            return res.status(404).json({ error: true, errormessage: `Ticket with code ${req.params.id} not found` });
        }
        const passenger = await users.getModel().findOne({ mail: req.auth.mail });
        if (!passenger) {
            return res.status(404).json({ error: true, errormessage: "Passenger not found" });
        }
        // Rimuove il ticket dall'array del passeggero
        passenger.tickets = passenger.tickets.filter(t => t._code !== ticket._code);
        await passenger.save();
        // Trova una airline disponibile
        const airline = await users.getModel().findOne({ roles: 'airline' });
        if (!airline) {
            return res.status(404).json({ error: true, errormessage: "No airline available to reassign ticket" });
        }
        // aggiorna il riferimento
        ticket.user = airline._id;
        await ticket.save();
        // aggiunge il ticket all'airline
        airline.tickets.push(ticket);
        await airline.save();
        return res.status(200).json({ error: false, errormessage: "" });
    }
    catch (err) {
        return next({ statuscode: 500, error: true, errormessage: "DB error: " + err.message });
    }
});
app.put('/tickets/:id', auth, async (req, res, next) => {
    try {
        const userId_tickets = req.params.id;
        const ticket = await tickets.getModel().findOne({ _code: userId_tickets });
        if (users.newUser(req.auth).hasPassangerRole()) {
            if (!req.body.user && !req.body.seat && !req.body.flight && !req.body.numBag && !req.body.price) {
                return next({ statusCode: 400, error: true, errormessage: "At least one field must be provided" });
            }
            if (req.body.user) {
                ticket.user = req.body.user;
            }
            if (req.body.seat) {
                ticket.seat = req.body.seat;
            }
            if (req.body.flight) {
                ticket.flight = req.body.flight;
            }
            if (req.body.numCabinBag) {
                ticket.numBag = req.body.numBag;
            }
            if (req.body.price) {
                ticket.price = req.body.price;
            }
            const updatedTicket = tickets.getModel().findOneAndUpdate({ _code: userId_tickets }, ticket).then(() => {
                return res.status(200).json({ error: false, errormessage: "", id: updatedTicket._code });
            }).catch(() => {
                return next({ statusCode: 404, error: true, errormessage: "Ticket not found." });
            });
        }
    }
    catch (error) {
        console.error("Error updating Ticket:", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});
/*
    Airports

    Insert -> POST      -> FATTO
    Update -> PUT       -> FATTO
    Delete -> DEL       -> FATTO
    Search -> GET       -> FATTO
 */
app.post("/airports", auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasAirlineRole())
        return next({ statuscode: 403, error: true, errormessage: "Unauthorized" });
    let ap = airports.newAirport(req.body);
    ap.save().then((data) => {
        return res.status(200).json({ error: false, errormessage: "", id: data._code });
    }).catch((reason) => {
        if (reason.code === 11000) {
            return next({ statuscode: 403, error: true, errormessage: "Flight already exists" });
        }
        else {
            return next({ statudcode: 404, error: true, errormessage: "DB error" + reason.errmsg });
        }
    });
});
app.put("/airports/:id", auth, async (req, res, next) => {
    try {
        if (!users.newUser(req.auth).hasAirlineRole())
            return next({ statuscode: 403, error: true, errormessage: "Access denied! Unauthorized to alter the airport " + req.params.id });
        if (!req.body.city && !req.body.name)
            return next({ statuscode: 400, error: true, errormessage: "At least one field must be provided" });
        const apID = req.params.id;
        const airport = await airports.getModel().findOne({ _code: apID });
        if (req.body.city)
            airport.city = req.body.city;
        if (req.body.name)
            airport.name = req.body.name;
        const updatedAirport = airports.getModel().findOneAndUpdate({ _code: apID }, airport).then(() => {
            return res.status(200).json({ error: false, errormessage: "", id: updatedAirport._code });
        }).catch(() => {
            return next({ statusCode: 404, error: true, errormessage: "Airport not found." });
        });
    }
    catch (error) {
        console.error("Error during updating Airport: ", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});
app.delete("/airports/:id", auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasAirlineRole())
        return next({ statuscode: 403, error: true, errormessage: "Access denied! Unauthorized user" });
    airports.getModel().deleteOne({ _code: req.params.id }).then((q) => {
        if (q.deletedCount > 0)
            return res.status(200).json({ error: false, errormessage: "" });
        else
            return res.status(404).json({ error: true, errormessage: "Airport with code" + req.params.id + "not found" });
    }).catch((reason) => {
        return next({ statuscode: 404, error: true, errormessage: "DB error" + reason });
    });
});
app.get("/airports", auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasPassangerRole() && !users.newUser(req.auth).hasAirlineRole())
        return next({ statuscode: 403, error: true, errormessage: "Unauthorized." });
    airports.getModel().find({}).then((airport) => {
        return res.status(200).json(airport);
    }).catch((reason) => {
        return next({ statuscode: 404, error: true, errormessage: "DB error" + reason });
    });
});
/*
    Seats

    Insert -> POST      -> FATTO
    Update -> PUT       -> FATTO
    Search -> GET       -> FATTO
 */
app.post("/seats", auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasAirlineRole())
        return next({ statuscode: 403, error: true, errormessage: "Unauthorized" });
    let s = seats.newSeat(req.body);
    s.save().then((data) => {
        return res.status(200).json({ error: false, errormessage: "", id: data._numSeat });
    }).catch((reason) => {
        if (reason.code === 11000) {
            return next({ statuscode: 409, error: true, errormessage: "Seat already exists" });
        }
        else {
            return next({ statudcode: 404, error: true, errormessage: "DB error" + reason.errmsg });
        }
    });
});
app.put("/seats/:id", auth, async (req, res, next) => {
    try {
        if (!users.newUser(req.auth).hasAirlineRole())
            return next({ statuscode: 403, error: true, errormessage: "Access denied! Unauthorized to alter the airport " + req.params.id });
        if (!req.body.class && !req.body.legroom && !req.body.isFree)
            return next({ statuscode: 400, error: true, errormessage: "At least one field must be provided" });
        const seatID = req.params.id;
        const seat = await seats.getModel().findOne({ _numSeat: seatID });
        if (req.body.class)
            seat.class = req.body.class;
        if (req.body.legroom)
            seat.legroom = req.body.legroom;
        if (req.body.isFree)
            seat.isFree = req.body.isFree;
        const updatedSeat = seats.getModel().findOneAndUpdate({ _numSeat: seatID }, seat).then(() => {
            return res.status(200).json({ error: false, errormessage: "", id: updatedSeat._numSeat });
        }).catch(() => {
            return next({ statusCode: 404, error: true, errormessage: "Seat not found." });
        });
    }
    catch (error) {
        console.error("Error during updating Seat: ", error);
        return next({ statusCode: 500, error: true, errormessage: "DB error: " + error.message });
    }
});
app.get("/seats", auth, (req, res, next) => {
    if (!users.newUser(req.auth).hasPassangerRole() && users.newUser(req.auth).hasAirlineRole())
        return next({ statuscode: 403, error: true, errormessage: "Unauthorized." });
    seats.getModel().find({}).then((seat) => {
        return res.status(200).json(seat);
    }).catch((reason) => {
        return next({ statuscode: 404, error: true, errormessage: "DB error" + reason });
    });
});
/*
    Features:
    - Filtered research of flights
        - Departing airport
        - Arriving airport
*/
app.get("/search", async (req, res, next) => {
    const search = {
        depart: req.query.depart,
        destination: req.query.destination
    };
    try {
        const route = await routes.getModel().findOne({ departure: search.depart, destination: search.destination });
        if (!route) {
            return next({ statusCode: 404, error: true, errormessage: "Route not found" });
        }
        // Se non ci sono scali
        if (!route.layoverFuel || route.layoverFuel.length === 0) {
            const directFlights = await flights.getModel().find({ route: route._id });
            const flightRes = [];
            for (let f of directFlights) {
                let r = await routes.getModel().findOne({ _id: f.route });
                let t = await tickets.getModel().findOne({ flight: f._flightCode });
                flightRes.push({ flightCode: f._flightCode, dataOra: f.dataOra, departure: r.departure, destination: r.destination, duration: f.duration, price: t.price });
            }
            return res.status(200).json(flightRes);
        }
        const validConnections = [];
        for (const layover of route.layoverFuel) {
            const firstLegRoute = await routes.getModel().findOne({ departure: search.depart, destination: layover });
            const secondLegRoute = await routes.getModel().findOne({ departure: layover, destination: search.destination });
            //if (!firstLegRoute || !secondLegRoute) continue;
            const firstFlights = await flights.getModel().find({ route: firstLegRoute._id });
            const secondFlights = await flights.getModel().find({ route: secondLegRoute._id });
            for (let first of firstFlights) {
                const firstArrival = new Date(first.dataOra.getTime() + first.duration * 60000);
                for (let second of secondFlights) {
                    const secondDeparture = new Date(second.dataOra);
                    const diffHours = (secondDeparture.getTime() - firstArrival.getTime()) / (1000 * 60 * 60);
                    let r = await routes.getModel().findOne({ _id: first.route });
                    let t = await tickets.getModel().findOne({ flight: first._flightCode });
                    let fst = {
                        flightCode: first._flightCode,
                        dataOra: first.dataOra,
                        departure: r.departure,
                        destination: r.destination,
                        duration: first.duration,
                        price: t.price
                    };
                    let r1 = await routes.getModel().findOne({ _id: second.route });
                    let t1 = await tickets.getModel().findOne({ flight: second._flightCode });
                    let snd = {
                        flightCode: second._flightCode,
                        dataOra: second.dataOra,
                        departure: r1.departure,
                        destination: r1.destination,
                        duration: second.duration,
                        price: t1.price
                    };
                    if (diffHours >= 2) {
                        validConnections.push({
                            layover,
                            firstLeg: fst,
                            secondLeg: snd
                        });
                    }
                }
            }
        }
        if (validConnections.length === 0) {
            return next({ statusCode: 404, error: true, errormessage: "No valid layover flights found" });
        }
        return res.status(200).json(validConnections);
    }
    catch (reason) {
        return next({ statusCode: 500, error: true, errormessage: "Server error: " + reason });
    }
});
// Add error handling middleware
app.use(function (err, req, res, next) {
    console.log("Request error: ".red + JSON.stringify(err));
    res.status(err.statusCode || 500).json(err);
});
app.use((req, res, next) => {
    res.status(404).json({ statusCode: 404, error: true, errormessage: "Invalid endpoint" });
});
//# sourceMappingURL=travelrequests.js.map