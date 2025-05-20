import * as users from "../DB_classes/Users";
import mongoose = require("mongoose");
import http = require("http");
import https = require("https");
import fs = require("fs");
const io = require("socket.io");
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
                console.log("Adding some test messages into the database");
                let m1 = users
                    .getModel()
                    .create({
                        username: "micbos71",
                        passportID: "KS2718281",
                        mail: "mic.bos.71@project_flight.it",
                    });
                let m2 = users
                    .getModel()
                    .create({
                        username: "bordjack47",
                        passportID: "VY3141592",
                        mail: "bordjack47@project_flight.it"
                    });
                let m3 = users
                    .getModel()
                    .create({
                        username: "tito_paul",
                        passportID: "GK1618033",
                        mail: "paul.tito@project_flight.it"
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
            console.log("Error Occurred during initialization".red);
            console.log(err);
        }
    );
}