
import mongoose = require("mongoose");
import http = require("http");
import https = require("https");
import fs = require("fs");
const io = require("socket.io");

import * as users from "./Users"
import * as airlines from "./Airlines"
import * as airports from "./Airports"
import * as tickets from "./Tickets"
import * as routes from "./Routes"
import * as seats from "./Seats"
import * as flights from "./Flights"
import * as aircrafts from "./Aircrafts"
import {Airlines} from "./Airlines";
import {Aircrafts} from "./Aircrafts";
import {Routes} from "./Routes";
import {Tickets} from "./Tickets";
import {Users} from "./Users";
import {Seats} from "./Seats";
import {Flights} from "./Flights";


let ios = undefined;

async function setSeats(aircraftSeats: Seats[], rows: number, seatsPerRow: number){
    const seatClasses = ["Economy", "Business", "First"];
    const seatLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];          // Configurazione standard
    const legroomProbability = 0.3;                                                                         // Probabilità che un posto abbia più spazio per le gambe
    const freeProbability = 0.7;                                                                            // Probabilità che un posto sia libero

    for (let row = 1; row <= rows; row++) {
        for (let letter=0; letter<seatsPerRow; letter++) {
            let seat = await seats
                .getModel()
                .create({
                    numberSeat: `${seatLetters[letter]}${row}`,
                    classes: seatClasses[Math.floor(Math.random() * seatClasses.length)],
                    legroom: Math.random() < legroomProbability,
                    isFree: Math.random() < freeProbability
                    /*
                        If isFree is false, we have to create its tickets!
                     */
                });
            aircraftSeats.push(seat);
        }
    }
}
async function aircraftConfig(aircraftModel: string, aircraftSeats: Seats[]) {
    /*
        "Boeing 777-300ER":         { rows: 50, seatsPerRow: 10 },
        "Boeing 777-200ER":         { rows: 47, seatsPerRow: 10 },
        "Airbus A380-800":          { rows: 60, seatsPerRow: 12 },
        "Boeing 787-9 Dreamliner":  { rows: 45, seatsPerRow: 9 },
        "Boeing 787-10 Dreamliner": { rows: 46, seatsPerRow: 9 },
        "Airbus A350-900":          { rows: 48, seatsPerRow: 9 },
        "Boeing 747-8I":            { rows: 55, seatsPerRow: 10 },
        "Boeing 747-400":           { rows: 54, seatsPerRow: 10 },
        "Airbus A321neo":           { rows: 32, seatsPerRow: 6 },
        "Airbus A320neo":           { rows: 30, seatsPerRow: 6 },
        "Airbus A320-200":          { rows: 30, seatsPerRow: 6 },
        "Airbus A319-100":          { rows: 25, seatsPerRow: 6 },
        "Boeing 737-800":           { rows: 35, seatsPerRow: 6 },
        "Boeing 737 MAX 9":         { rows: 35, seatsPerRow: 6 },
        "Boeing 737 MAX 8":         { rows: 34, seatsPerRow: 6 },
        "Comac C919":               { rows: 30, seatsPerRow: 6 },
        "Airbus A340-600":          { rows: 50, seatsPerRow: 9 },
        "Airbus A350-1000":         { rows: 48, seatsPerRow: 9 },
     */
    let rows: number;
    let seatsPerRow: number;
    switch(aircraftModel){
        case "Boeing 777-300ER":
            rows=50;
            seatsPerRow=10;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Boeing 777-200ER":
            rows=47;
            seatsPerRow=10;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Airbus A380-800":
            rows=60;
            seatsPerRow=12;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Boeing 787-9 Dreamliner":
            rows=45;
            seatsPerRow=9;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Boeing 787-10 Dreamliner":
            rows=46;
            seatsPerRow=9;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Airbus A350-900":
            rows=48;
            seatsPerRow=9;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Airbus A350-1000":
            rows=48;
            seatsPerRow=9;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Boeing 747-8I":
            rows=55;
            seatsPerRow=10;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Boeing 747-400":
            rows=54;
            seatsPerRow=10;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Airbus A321neo":
            rows=32;
            seatsPerRow=6;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Airbus A320neo":
            rows=30;
            seatsPerRow=6;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Airbus A320-200":
            rows=30;
            seatsPerRow=6;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Airbus A319-100":
            rows=25;
            seatsPerRow=6;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Boeing 737-800":
            rows=35;
            seatsPerRow=6;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Boeing 737 MAX 9":
            rows=35;
            seatsPerRow=6;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Boeing 737 MAX 8":
            rows=34;
            seatsPerRow=6;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Comac C919":
            rows=30;
            seatsPerRow=6;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
        case "Airbus A340-600":
            rows=50;
            seatsPerRow=9;
            await setSeats(aircraftSeats, rows, seatsPerRow);
            break;
    }
    return aircraftSeats
}

export function DB_initialization(app) {
// Connect to mongodb and launch the HTTP server trough Express
    mongoose.connect('mongodb://mongoproject:27017/flight_project')
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
                return u.save();
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
            if (count-1 == 0) {
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
            return airports.getModel().countDocuments({})
        }
    ).then(
        (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test airports into the database");
                let airportsData = airports.getModel().create([
                    { name: "ATL", city: "Atlanta",         state: "USA",               position: [33.6407, -84.4277] },
                    { name: "DXB", city: "Dubai",           state: "UAE",               position: [25.2532, 55.3657] },
                    { name: "HND", city: "Tokyo",           state: "Japan",             position: [35.5494, 139.7798] },
                    { name: "LHR", city: "London",          state: "UK",                position: [51.4700, -0.4543] },
                    { name: "DFW", city: "Dallas",          state: "USA",               position: [32.8998, -97.0403] },
                    { name: "DEN", city: "Denver",          state: "USA",               position: [39.8561, -104.6737] },
                    { name: "ORD", city: "Chicago",         state: "USA",               position: [41.9742, -87.9073] },
                    { name: "IST", city: "Istanbul",        state: "Turkey",            position: [41.2753, 28.7519] },
                    { name: "DEL", city: "Delhi",           state: "India",             position: [28.5562, 77.1000] },
                    { name: "PVG", city: "Shanghai",        state: "China",             position: [31.1443, 121.8083] },
                    { name: "LAX", city: "Los Angeles",     state: "USA",               position: [33.9416, -118.4085] },
                    { name: "SIN", city: "Singapore",       state: "Singapore",         position: [1.3644, 103.9915] },
                    { name: "CDG", city: "Paris",           state: "France",            position: [49.0097, 2.5479] },
                    { name: "FRA", city: "Frankfurt",       state: "Germany",           position: [50.0379, 8.5622] },
                    { name: "MUC", city: "Munich",          state: "Germany",           position: [48.3537, 11.7861] },
                    { name: "ZRH", city: "Zurich",          state: "Switzerland",       position: [47.4506, 8.5610] },
                    { name: "SYD", city: "Sydney",          state: "Australia",         position: [-33.9399, 151.1753] },
                    { name: "JFK", city: "New York",        state: "USA",               position: [40.6413, -73.7781] },
                    { name: "SFO", city: "San Francisco",   state: "USA",               position: [37.6213, -122.3790] },
                    { name: "YYZ", city: "Toronto",         state: "Canada",            position: [43.6777, -79.6248] },
                    { name: "GRU", city: "São Paulo",       state: "Brazil",            position: [-23.4319, -46.4679] },
                    { name: "EZE", city: "Buenos Aires",    state: "Argentina",         position: [-34.8222, -58.5358] },
                    { name: "HKG", city: "Hong Kong",       state: "China",             position: [22.3080, 113.9185] },
                    { name: "ICN", city: "Seoul",           state: "South Korea",       position: [37.4602, 126.4407] },
                    { name: "NRT", city: "Tokyo",           state: "Japan",             position: [35.7719, 140.3929] },
                    { name: "BKK", city: "Bangkok",         state: "Thailand",          position: [13.6811, 100.7473] },
                    { name: "DOH", city: "Doha",            state: "Qatar",             position: [25.2731, 51.6085] },
                    { name: "AMS", city: "Amsterdam",       state: "Netherlands",       position: [52.3105, 4.7683] },
                    { name: "VIE", city: "Vienna",          state: "Austria",           position: [48.1103, 16.5697] },
                    { name: "MAD", city: "Madrid",          state: "Spain",             position: [40.4722, -3.5609] },
                    { name: "BCN", city: "Barcelona",       state: "Spain",             position: [41.2974, 2.0833] },
                    { name: "MEX", city: "Mexico City",     state: "Mexico",            position: [19.4361, -99.0719] },
                    { name: "LIM", city: "Lima",            state: "Peru",              position: [-12.0219, -77.1143] },
                    { name: "JNB", city: "Johannesburg",    state: "South Africa",      position: [-26.1367, 28.2411] },
                    { name: "CPT", city: "Cape Town",       state: "South Africa",      position: [-33.9694, 18.5975] },
                    { name: "VCE", city: "Venice",          state: "Italy",             position: [45.3019, 12.2107] },
                    { name: "FCO", city: "Rome",            state: "Italy",             position: [41.8003, 12.2389] },
                    { name: "MXP", city: "Milan",           state: "Italy",             position: [45.6300, 8.7281] },
                    { name: "GIG", city: "Rio de Janeiro",  state: "Brazil",            position: [-22.8099, -43.2506] },
                    { name: "PEK", city: "Beijing",         state: "China",             position: [40.0801, 116.5846] },
                    { name: "KUL", city: "Kuala Lumpur",    state: "Malaysia",          position: [2.7456, 101.7099] },
                    { name: "IST", city: "Istanbul",        state: "Turkey",            position: [41.2753, 28.7519] },
                    { name: "DME", city: "Moscow",          state: "Russia",            position: [55.4088, 37.9063] },
                    { name: "SVO", city: "Moscow",          state: "Russia",            position: [55.9726, 37.4146] },
                    { name: "LED", city: "Saint Petersburg", state: "Russia",           position: [59.8003, 30.2625] },
                    { name: "CUN", city: "Cancún",          state: "Mexico",            position: [21.0365, -86.8771] },
                    { name: "MIA", city: "Miami",           state: "USA",               position: [25.7959, -80.2870] },
                    { name: "BOS", city: "Boston",          state: "USA",               position: [42.3656, -71.0096] },
                    { name: "PHX", city: "Phoenix",         state: "USA",               position: [33.4343, -112.0122] },
                    { name: "IAH", city: "Houston",         state: "USA",               position: [29.9902, -95.3368] },
                    { name: "DTW", city: "Detroit",         state: "USA",               position: [42.2124, -83.3534] },
                    { name: "SAN", city: "San Diego",       state: "USA",               position: [32.7336, -117.1897] },
                    { name: "MCO", city: "Orlando",         state: "USA",               position: [28.4312, -81.3081] },
                    { name: "SLC", city: "Salt Lake City",  state: "USA",               position: [40.7899, -111.9791] },
                    { name: "YVR", city: "Vancouver",       state: "Canada",            position: [49.1947, -123.1792] },
                    { name: "MEM", city: "Memphis",         state: "USA",               position: [35.0424, -89.9767] },
                    { name: "SAT", city: "San Antonio",     state: "USA",               position: [29.5337, -98.4698] },
                    { name: "TUL", city: "Tulsa",           state: "USA",               position: [36.1984, -95.8881] },
                    { name: "JAX", city: "Jacksonville",    state: "USA",               position: [30.4941, -81.6879] },
                    { name: "BUF", city: "Buffalo",         state: "USA",               position: [42.9405, -78.7322] },
                    { name: "DUB", city: "Dublin",          state: "Ireland",           position: [53.4213, -6.2701] },
                    { name: "CPH", city: "Copenhagen",      state: "Denmark",           position: [55.6181, 12.6561] },
                    { name: "OSL", city: "Oslo",            state: "Norway",            position: [60.1939, 11.1004] },
                    { name: "ARN", city: "Stockholm",       state: "Sweden",            position: [59.6519, 17.9186] },
                    { name: "HEL", city: "Helsinki",        state: "Finland",           position: [60.3172, 24.9633] },
                    { name: "PRG", city: "Prague",          state: "Czech Republic",    position: [50.1008, 14.2600] },
                    { name: "BRU", city: "Brussels",        state: "Belgium",           position: [50.9010, 4.4844] },
                    { name: "LIS", city: "Lisbon",          state: "Portugal",          position: [38.7742, -9.1342] },
                    { name: "ATH", city: "Athens",          state: "Greece",            position: [37.9364, 23.9445] },
                    { name: "SOF", city: "Sofia",           state: "Bulgaria",          position: [42.6952, 23.4021] },
                    { name: "BOM", city: "Mumbai",          state: "India",             position: [19.0896, 72.8656] },
                    { name: "SGN", city: "Ho Chi Minh City", state: "Vietnam",          position: [10.8185, 106.6519] },
                    { name: "MNL", city: "Manila",          state: "Philippines",       position: [14.5086, 121.0198] },
                    { name: "TPE", city: "Taipei",          state: "Taiwan",            position: [25.0777, 121.2325] },
                    { name: "JED", city: "Jeddah",          state: "Saudi Arabia",      position: [21.6796, 39.1565] },
                    { name: "RUH", city: "Riyadh",          state: "Saudi Arabia",      position: [24.9576, 46.6988] },
                    { name: "BOG", city: "Bogotá",          state: "Colombia",          position: [4.7016, -74.1469] },
                    { name: "SCL", city: "Santiago",        state: "Chile",             position: [-33.3930, -70.7856] },
                    { name: "UIO", city: "Quito",           state: "Ecuador",           position: [-0.1292, -78.3575] },
                    { name: "PTY", city: "Panama City",     state: "Panama",            position: [9.0714, -79.3835] },
                    { name: "CAI", city: "Cairo",           state: "Egypt",             position: [30.1219, 31.4056] },
                    { name: "NBO", city: "Nairobi",         state: "Kenya",             position: [-1.3192, 36.9275] },
                    { name: "LOS", city: "Lagos",           state: "Nigeria",           position: [6.5774, 3.3212] },
                    { name: "ACC", city: "Accra",           state: "Ghana",             position: [5.6052, -0.1668] },
                    { name: "DAR", city: "Dar es Salaam",   state: "Tanzania",          position: [-6.8751, 39.2026] },
                    { name: "ADD", city: "Addis Abeba",     state: "Ethiopia",          position: [8.9779, 38.7993] },
                    { name: "CMN", city: "Casablanca",      state: "Morocco",           position: [33.3675, -7.5899] },
                    { name: "DKR", city: "Dakar",           state: "Senegal",           position: [14.7397, -17.4902] }
                ]);
                return airportsData;
            }
        }
    ).then(
        () => {
            return routes.getModel().countDocuments({})
        }
    ).then(
        (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test routes into the database");
                let routesData = routes.getModel().create([
                    /* Routes with stops */
                    { destination: airports.getModel().findOne({name: "VCE"}), depart: airports.getModel().findOne({name: "JFK"}), layoverFuel: airports.getModel().findOne({name: "FRA"}) },
                    { destination: airports.getModel().findOne({name: "LHR"}), depart: airports.getModel().findOne({name: "SYD"}), layoverFuel: airports.getModel().findOne({name: "DXB"}) },
                    { destination: airports.getModel().findOne({name: "CDG"}), depart: airports.getModel().findOne({name: "LAX"}), layoverFuel: airports.getModel().findOne({name: "ORD"}) },
                    { destination: airports.getModel().findOne({name: "HND"}), depart: airports.getModel().findOne({name: "JFK"}), layoverFuel: airports.getModel().findOne({name: "ICN"}) },
                    { destination: airports.getModel().findOne({name: "AMS"}), depart: airports.getModel().findOne({name: "GRU"}), layoverFuel: airports.getModel().findOne({name: "MAD"}) },
                    { destination: airports.getModel().findOne({name: "SIN"}), depart: airports.getModel().findOne({name: "YYZ"}), layoverFuel: airports.getModel().findOne({name: "HKG"}) },
                    { destination: airports.getModel().findOne({name: "FCO"}), depart: airports.getModel().findOne({name: "SFO"}), layoverFuel: airports.getModel().findOne({name: "LHR"}) },
                    { destination: airports.getModel().findOne({name: "ICN"}), depart: airports.getModel().findOne({name: "MEX"}), layoverFuel: airports.getModel().findOne({name: "NRT"}) },
                    { destination: airports.getModel().findOne({name: "JNB"}), depart: airports.getModel().findOne({name: "ORD"}), layoverFuel: airports.getModel().findOne({name: "DOH"}) },
                    { destination: airports.getModel().findOne({name: "SYD"}), depart: airports.getModel().findOne({name: "DXB"}), layoverFuel: airports.getModel().findOne({name: "SIN"}) },
                    { destination: airports.getModel().findOne({name: "HND"}), depart: airports.getModel().findOne({name: "ATL"}), layoverFuel: airports.getModel().findOne({name: "LAX"}) },
                    { destination: airports.getModel().findOne({name: "LHR"}), depart: airports.getModel().findOne({name: "DXB"}), layoverFuel: airports.getModel().findOne({name: "IST"}) },
                    { destination: airports.getModel().findOne({name: "SYD"}), depart: airports.getModel().findOne({name: "ORD"}), layoverFuel: airports.getModel().findOne({name: "ICN"}) },
                    { destination: airports.getModel().findOne({name: "SYD"}), depart: airports.getModel().findOne({name: "JFK"}), layoverFuel: airports.getModel().findOne({name: "LAX"}) }, // USA → Australia via Los Angeles
                    { destination: airports.getModel().findOne({name: "DXB"}), depart: airports.getModel().findOne({name: "LHR"}), layoverFuel: airports.getModel().findOne({name: "IST"}) }, // UK → UAE via Istanbul
                    { destination: airports.getModel().findOne({name: "HND"}), depart: airports.getModel().findOne({name: "ATL"}), layoverFuel: airports.getModel().findOne({name: "ICN"}) }, // USA → Japan via Seoul
                    { destination: airports.getModel().findOne({name: "GRU"}), depart: airports.getModel().findOne({name: "CDG"}), layoverFuel: airports.getModel().findOne({name: "MAD"}) }, // France → Brazil via Madrid
                    { destination: airports.getModel().findOne({name: "SIN"}), depart: airports.getModel().findOne({name: "YYZ"}), layoverFuel: airports.getModel().findOne({name: "HKG"}) }, // Canada → Singapore via Hong Kong
                    { destination: airports.getModel().findOne({name: "JNB"}), depart: airports.getModel().findOne({name: "ORD"}), layoverFuel: airports.getModel().findOne({name: "DOH"}) }, // USA → South Africa via Doha
                    { destination: airports.getModel().findOne({name: "PEK"}), depart: airports.getModel().findOne({name: "MEX"}), layoverFuel: airports.getModel().findOne({name: "NRT"}) }, // Mexico → China via Tokyo Narita
                    { destination: airports.getModel().findOne({name: "AMS"}), depart: airports.getModel().findOne({name: "EZE"}), layoverFuel: airports.getModel().findOne({name: "BCN"}) }, // Argentina → Netherlands via Barcelona
                    { destination: airports.getModel().findOne({name: "FCO"}), depart: airports.getModel().findOne({name: "SFO"}), layoverFuel: airports.getModel().findOne({name: "LHR"}) }, // USA → Italy via London
                    { destination: airports.getModel().findOne({name: "ICN"}), depart: airports.getModel().findOne({name: "DEL"}), layoverFuel: airports.getModel().findOne({name: "BKK"}) }, // India → South Korea via Bangkok

                    /* Direct routes */
                    { destination: airports.getModel().findOne({name: "JFK"}), depart: airports.getModel().findOne({name: "LHR"}) }, // Londra → New York
                    { destination: airports.getModel().findOne({name: "DXB"}), depart: airports.getModel().findOne({name: "SYD"}) }, // Sydney → Dubai
                    { destination: airports.getModel().findOne({name: "ATL"}), depart: airports.getModel().findOne({name: "FRA"}) }, // Francoforte → Atlanta
                    { destination: airports.getModel().findOne({name: "SIN"}), depart: airports.getModel().findOne({name: "HND"}) }, // Tokyo Haneda → Singapore
                    { destination: airports.getModel().findOne({name: "ICN"}), depart: airports.getModel().findOne({name: "LAX"}) }, // Los Angeles → Seoul
                    { destination: airports.getModel().findOne({name: "AMS"}), depart: airports.getModel().findOne({name: "YYZ"}) }, // Toronto → Amsterdam
                    { destination: airports.getModel().findOne({name: "GRU"}), depart: airports.getModel().findOne({name: "CDG"}) }, // Parigi → São Paulo
                    { destination: airports.getModel().findOne({name: "JNB"}), depart: airports.getModel().findOne({name: "DEL"}) }, // Delhi → Johannesburg
                    { destination: airports.getModel().findOne({name: "MEX"}), depart: airports.getModel().findOne({name: "EZE"}) }, // Buenos Aires → Città del Messico
                    { destination: airports.getModel().findOne({name: "SYD"}), depart: airports.getModel().findOne({name: "PEK"}) }, // Pechino → Sydney

                    { destination: airports.getModel().findOne({name: "JFK"}), depart: airports.getModel().findOne({name: "LAX"}) }, // Los Angeles → New York
                    { destination: airports.getModel().findOne({name: "ORD"}), depart: airports.getModel().findOne({name: "ATL"}) }, // Atlanta → Chicago
                    { destination: airports.getModel().findOne({name: "DFW"}), depart: airports.getModel().findOne({name: "DEN"}) }, // Denver → Dallas
                    { destination: airports.getModel().findOne({name: "YYZ"}), depart: airports.getModel().findOne({name: "MEX"}) }, // Toronto → Mexico City
                    { destination: airports.getModel().findOne({name: "SFO"}), depart: airports.getModel().findOne({name: "SEA"}) }, // San Francisco → Seattle

                    { destination: airports.getModel().findOne({name: "LHR"}), depart: airports.getModel().findOne({name: "CDG"}) }, // Parigi → Londra
                    { destination: airports.getModel().findOne({name: "AMS"}), depart: airports.getModel().findOne({name: "FRA"}) }, // Francoforte → Amsterdam
                    { destination: airports.getModel().findOne({name: "MAD"}), depart: airports.getModel().findOne({name: "BCN"}) }, // Barcellona → Madrid
                    { destination: airports.getModel().findOne({name: "VIE"}), depart: airports.getModel().findOne({name: "ZRH"}) }, // Zurigo → Vienna
                    { destination: airports.getModel().findOne({name: "MXP"}), depart: airports.getModel().findOne({name: "FCO"}) }, // Milano → Roma

                    { destination: airports.getModel().findOne({name: "MXP"}), depart: airports.getModel().findOne({name: "SIN"}) }, // Milano Malpensa → Singapore
                    { destination: airports.getModel().findOne({name: "ICN"}), depart: airports.getModel().findOne({name: "PVG"}) }, // Shanghai → Seoul
                    { destination: airports.getModel().findOne({name: "SIN"}), depart: airports.getModel().findOne({name: "BKK"}) }, // Bangkok → Singapore
                    { destination: airports.getModel().findOne({name: "DEL"}), depart: airports.getModel().findOne({name: "PEK"}) }, // Pechino → Delhi
                    { destination: airports.getModel().findOne({name: "KUL"}), depart: airports.getModel().findOne({name: "DOH"}) }, // Kuala Lumpur → Doha

                    { destination: airports.getModel().findOne({name: "GRU"}), depart: airports.getModel().findOne({name: "EZE"}) }, // Buenos Aires → São Paulo
                    { destination: airports.getModel().findOne({name: "LIM"}), depart: airports.getModel().findOne({name: "MEX"}) }, // Città del Messico → Lima
                    { destination: airports.getModel().findOne({name: "GIG"}), depart: airports.getModel().findOne({name: "BOG"}) }, // Bogotá → Rio de Janeiro
                    { destination: airports.getModel().findOne({name: "SCL"}), depart: airports.getModel().findOne({name: "UIO"}) }, // Quito → Santiago del Cile
                    { destination: airports.getModel().findOne({name: "CUN"}), depart: airports.getModel().findOne({name: "PTY"}) }, // Cancún → Panama City

                    { destination: airports.getModel().findOne({name: "JNB"}), depart: airports.getModel().findOne({name: "CPT"}) }, // Cape Town → Johannesburg
                    { destination: airports.getModel().findOne({name: "CAI"}), depart: airports.getModel().findOne({name: "NBO"}) }, // Nairobi → Cairo
                    { destination: airports.getModel().findOne({name: "LOS"}), depart: airports.getModel().findOne({name: "ACC"}) }, // Accra → Lagos
                    { destination: airports.getModel().findOne({name: "DAR"}), depart: airports.getModel().findOne({name: "ADD"}) }, // Addis Abeba → Dar es Salaam
                    { destination: airports.getModel().findOne({name: "CMN"}), depart: airports.getModel().findOne({name: "DKR"}) } // Dakar → Casablanca
                ]);
                return routesData;
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
            return seats.getModel().countDocuments({})
        }
    ).then(
        /*
        (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test seats into the database");
                let seatsArray = [];
                const seatClasses = ["Economy", "Business", "First"];
                const aircraftRows = 50; // Numero di file realistico per un aereo commerciale
                const seatLetters = ["A", "B", "C", "D", "E", "F"]; // Configurazione standard
                const legroomProbability = 0.3; // Probabilità che un posto abbia più spazio per le gambe
                const freeProbability = 0.7; // Probabilità che un posto sia libero

                for (let row = 1; row <= aircraftRows; row++) {
                    for (let letter of seatLetters) {
                        let seat = seats
                            .getModel()
                            .create({
                                numberSeat: `${letter}${row}`,
                                classes: seatClasses[Math.floor(Math.random() * seatClasses.length)],
                                legroom: Math.random() < legroomProbability,
                                isFree: Math.random() < freeProbability
                            });
                        seatsArray.push(seat);
                    }
                }

                console.log(seatsArray);

                return seatsArray;
            }
        }
        */

        /*
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
                console.log("Adding some test aircrafts into the database");
                let boeing777Seats: seats.Seats[]=[];
                let airbusA380Seats: seats.Seats[]=[];
                let boeing787Seats: seats.Seats[]=[];
                let airbusA350Seats: seats.Seats[]=[];
                let boeing747Seats: seats.Seats[]=[];
                let airbusA320Seats: seats.Seats[]=[];
                let boeing737Seats: seats.Seats[]=[];
                let airbusA319Seats: seats.Seats[]=[];
                let airbusA321Seats: seats.Seats[]=[];

                let aircraftsData = aircrafts.getModel().create([
                    { aircraftID: "A6-ECI",     aircraftModel: "Boeing 777-300ER",          seat: aircraftConfig("Boeing 777-300ER",            boeing777Seats) }, // Emirates
                    { aircraftID: "G-YMMN",     aircraftModel: "Boeing 777-200ER",          seat: aircraftConfig("Boeing 777-200ER",            boeing777Seats) }, // British Airways
                    { aircraftID: "SQ638",      aircraftModel: "Airbus A380-800",           seat: aircraftConfig("Airbus A380-800",             airbusA380Seats) }, // Singapore Airlines
                    { aircraftID: "JA381A",     aircraftModel: "Airbus A380-800",           seat: aircraftConfig("Airbus A380-800",             airbusA380Seats) }, // All Nippon Airways (ANA)
                    { aircraftID: "N6067E",     aircraftModel: "Boeing 787-9 Dreamliner",   seat: aircraftConfig("Boeing 787-9 Dreamliner",     boeing787Seats) }, // United Airlines
                    { aircraftID: "F-HRBA",     aircraftModel: "Boeing 787-10 Dreamliner",  seat: aircraftConfig("Boeing 787-10 Dreamliner",    boeing787Seats) }, // Air France
                    { aircraftID: "JA01XJ",     aircraftModel: "Airbus A350-900",           seat: aircraftConfig("Airbus A350-900",             airbusA350Seats) }, // Japan Airlines
                    { aircraftID: "EC-MIL",     aircraftModel: "Airbus A350-900",           seat: aircraftConfig("Airbus A350-900",             airbusA380Seats) }, // Iberia
                    { aircraftID: "D-ABYA",     aircraftModel: "Boeing 747-8I",             seat: aircraftConfig("Boeing 747-8I",               boeing747Seats) }, // Lufthansa
                    { aircraftID: "B-2485",     aircraftModel: "Boeing 747-8I",             seat: aircraftConfig("Boeing 747-8I",               boeing747Seats) }, // Air China
                    { aircraftID: "N780BA",     aircraftModel: "Boeing 747-400",            seat: aircraftConfig("Boeing 747-400",              boeing747Seats) }, // Atlas Air
                    { aircraftID: "F-GSQJ",     aircraftModel: "Boeing 777-300ER",          seat: aircraftConfig("Boeing 777-300ER",            boeing777Seats) }, // Air France
                    { aircraftID: "N26902",     aircraftModel: "Boeing 787-9 Dreamliner",   seat: aircraftConfig("Boeing 787-9 Dreamliner",     boeing787Seats) }, // United Airlines
                    { aircraftID: "N501DN",     aircraftModel: "Airbus A321neo",            seat: aircraftConfig("Airbus A321neo",              airbusA321Seats) }, // Delta Air Lines
                    { aircraftID: "G-TTNA",     aircraftModel: "Airbus A320neo",            seat: aircraftConfig("Airbus A320",                 airbusA320Seats) }, // British Airways
                    { aircraftID: "N320FR",     aircraftModel: "Airbus A320neo",            seat: aircraftConfig("Airbus A320neo",              airbusA320Seats) }, // Frontier Airlines
                    { aircraftID: "G-EUPA",     aircraftModel: "Airbus A319-100",           seat: aircraftConfig("Airbus A319-100",             airbusA319Seats) }, // British Airways
                    { aircraftID: "N601NK",     aircraftModel: "Airbus A320-200",           seat: aircraftConfig("Airbus A320-200",             airbusA320Seats) }, // Spirit Airlines
                    { aircraftID: "JA73AN",     aircraftModel: "Boeing 737-800",            seat: aircraftConfig("Boeing 737-800",              boeing737Seats) }, // All Nippon Airways (ANA)
                    { aircraftID: "N5017Q",     aircraftModel: "Boeing 737 MAX 9",          seat: aircraftConfig("Boeing 737 MAX 9",            boeing737Seats) }, // Alaska Airlines
                    { aircraftID: "B-304Z",     aircraftModel: "Comac C919",                seat: aircraftConfig("Comac C919",                  airbusA320Seats) }, // China Eastern Airlines
                    { aircraftID: "VH-OQB",     aircraftModel: "Airbus A380-800",           seat: aircraftConfig("Airbus A380-800",             airbusA380Seats) }, // Qantas Airways
                    { aircraftID: "D-AIMD",     aircraftModel: "Airbus A340-600",           seat: aircraftConfig("Airbus A340-600",             airbusA350Seats) }, // Lufthansa
                    { aircraftID: "G-VNAP",     aircraftModel: "Airbus A340-600",           seat: aircraftConfig("Airbus A340-600",             airbusA350Seats) }, // Virgin Atlantic
                    { aircraftID: "F-WWCF",     aircraftModel: "Airbus A350-1000",          seat: aircraftConfig("Airbus A350-1000",            airbusA350Seats) }, // Qatar Airways
                    { aircraftID: "N264LV",     aircraftModel: "Boeing 737 MAX 8",          seat: aircraftConfig("Boeing 737 MAX 8",            boeing737Seats) }, // Southwest Airlines
                    { aircraftID: "N501DN",     aircraftModel: "Airbus A321neo",            seat: aircraftConfig("Airbus A321neo",              airbusA321Seats) }, // Delta Air Lines
                    { aircraftID: "G-TTNA",     aircraftModel: "Airbus A320neo",            seat: aircraftConfig("Airbus A320neo",              airbusA320Seats) }, // British Airways
                    { aircraftID: "N320FR",     aircraftModel: "Airbus A320neo",            seat: aircraftConfig("Airbus A320neo",              airbusA380Seats) }, // Frontier Airlines
                    { aircraftID: "JA01XJ",     aircraftModel: "Airbus A350-900",           seat: aircraftConfig("Airbus A350-900",             airbusA350Seats) }, // Japan Airlines
                    { aircraftID: "B-304Z",     aircraftModel: "Comac C919",                seat: aircraftConfig("Comac C919",                  airbusA320Seats) }, // China Eastern Airlines
                    { aircraftID: "N5017Q",     aircraftModel: "Boeing 737 MAX 9",          seat: aircraftConfig("Boeing 737 MAX 9",            boeing737Seats) }, // Alaska Airlines
                    { aircraftID: "G-EUPA",     aircraftModel: "Airbus A319-100",           seat: aircraftConfig("Airbus A319-100",             airbusA319Seats) }, // British Airways
                    { aircraftID: "N601NK",     aircraftModel: "Airbus A320-200",           seat: aircraftConfig("Airbus A320-200",             airbusA320Seats) }, // Spirit Airlines
                    { aircraftID: "JA73AN",     aircraftModel: "Boeing 737-800",            seat: aircraftConfig("Boeing 737-800",              boeing737Seats) }, // All Nippon Airways (ANA)
                    { aircraftID: "N780BA",     aircraftModel: "Boeing 747-400",            seat: aircraftConfig("Boeing 747-400",              boeing747Seats) }, // Atlas Air
                    { aircraftID: "F-GSQJ",     aircraftModel: "Boeing 777-300ER",          seat: aircraftConfig("Boeing 777-300ER",            boeing777Seats) }, // Air France
                    { aircraftID: "N26902",     aircraftModel: "Boeing 787-9 Dreamliner",   seat: aircraftConfig("Boeing 787-9 Dreamliner",     boeing787Seats) }, // United Airlines
                ]);
                return aircraftsData;
            }
        }
        /*
            Seats
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
                console.log("Adding some test flights into the database");
                let flightsData = flights.getModel().create([
                    { flightCode: "LH400",  airline: airlines.getModel().findOne({name: "Lufthansa"}),                  aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A380-800"}),                 route: routes.getModel().findOne({depart: "FRA", destination: "JFK"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 20, 15, 30) },
                    { flightCode: "BA117",  airline: airlines.getModel().findOne({name: "British Airways"}),            aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 777-300ER"}),                route: routes.getModel().findOne({depart: "LHR", destination: "JFK"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 20, 14, 15) },
                    { flightCode: "QR818",  airline: airlines.getModel().findOne({name: "Qatar Airways"}),              aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A350-1000"}),                route: routes.getModel().findOne({depart: "DOH", destination: "ICN"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 21, 22, 45) },
                    { flightCode: "SQ638",  airline: airlines.getModel().findOne({name: "Singapore Airlines"}),         aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A380-800"}),                 route: routes.getModel().findOne({depart: "SIN", destination: "NRT"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 21, 10, 5) },
                    { flightCode: "EK202",  airline: airlines.getModel().findOne({name: "Emirates"}),                   aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 777-300ER"}),                route: routes.getModel().findOne({depart: "JFK", destination: "DXB"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 22, 18, 20) },
                    { flightCode: "JL9",    airline: airlines.getModel().findOne({name: "Japan Airlines"}),             aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 787-9 Dreamliner"}),         route: routes.getModel().findOne({depart: "HND", destination: "SFO"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 22, 12, 10) },
                    { flightCode: "AF96",   airline: airlines.getModel().findOne({name: "Air France"}),                 aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A350-900"}),                 route: routes.getModel().findOne({depart: "CDG", destination: "YYZ"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 23, 16, 45) },
                    { flightCode: "TK10",   airline: airlines.getModel().findOne({name: "Turkish Airlines"}),           aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 787-9 Dreamliner"}),         route: routes.getModel().findOne({depart: "IST", destination: "LAX"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 24, 19, 30) },
                    { flightCode: "DL200",  airline: airlines.getModel().findOne({name: "Delta Air Lines"}),            aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 767-400ER"}),                route: routes.getModel().findOne({depart: "ATL", destination: "AMS"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 25, 21, 15) },
                    { flightCode: "UA181",  airline: airlines.getModel().findOne({name: "United Airlines"}),            aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 777-200ER"}),                route: routes.getModel().findOne({depart: "ORD", destination: "HKG"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 26, 13, 0) },
                    { flightCode: "AZ611",  airline: airlines.getModel().findOne({name: "ITA Airways"}),                aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A330-900"}),                 route: routes.getModel().findOne({depart: "FCO", destination: "JFK"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 21, 10, 50) },
                    { flightCode: "KL641",  airline: airlines.getModel().findOne({name: "KLM Royal Dutch Airlines"}),   aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 787-9 Dreamliner"}),         route: routes.getModel().findOne({depart: "AMS", destination: "JFK"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 21, 14, 35) },
                    { flightCode: "AF9",    airline: airlines.getModel().findOne({name: "Air France"}),                 aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A350-1000"}),                route: routes.getModel().findOne({depart: "CDG", destination: "LAX"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 22, 9, 55) },
                    { flightCode: "LH441",  airline: airlines.getModel().findOne({name: "Lufthansa"}),                  aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 747-8I"}),                   route: routes.getModel().findOne({depart: "FRA", destination: "IAH"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 22, 15, 40) },
                    { flightCode: "EK201",  airline: airlines.getModel().findOne({name: "Emirates"}),                   aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 777-300ER"}),                route: routes.getModel().findOne({depart: "DXB", destination: "JFK"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 23, 8, 30) },
                    { flightCode: "QR725",  airline: airlines.getModel().findOne({name: "Qatar Airways"}),              aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A350-900"}),                 route: routes.getModel().findOne({depart: "DOH", destination: "ORD"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 23, 11, 15) },
                    { flightCode: "NH175",  airline: airlines.getModel().findOne({name: "ANA All Nippon Airways"}),     aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 787-9 Dreamliner"}),         route: routes.getModel().findOne({depart: "HND", destination: "SEA"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 24, 17, 20) },
                    { flightCode: "JL6",    airline: airlines.getModel().findOne({name: "Japan Airlines"}),             aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 777-300ER"}),                route: routes.getModel().findOne({depart: "NRT", destination: "JFK"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 24, 13, 5) },
                    { flightCode: "BA219",  airline: airlines.getModel().findOne({name: "British Airways"}),            aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A350-1000"}),                route: routes.getModel().findOne({depart: "LHR", destination: "DEN"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 25, 16, 30) },
                    { flightCode: "TK80",   airline: airlines.getModel().findOne({name: "Turkish Airlines"}),           aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 787-9 Dreamliner"}),         route: routes.getModel().findOne({depart: "IST", destination: "SFO"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 26, 12, 45) },
                    { flightCode: "EY101",  airline: airlines.getModel().findOne({name: "Etihad Airways"}),             aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 787-10 Dreamliner"}),        route: routes.getModel().findOne({depart: "AUH", destination: "JFK"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 20, 22, 10) },
                    { flightCode: "CX255",  airline: airlines.getModel().findOne({name: "Cathay Pacific"}),             aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A350-1000"}),                route: routes.getModel().findOne({depart: "HKG", destination: "LHR"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 21, 7, 30) },
                    { flightCode: "KE81",   airline: airlines.getModel().findOne({name: "Korean Air"}),                 aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 747-8I"}),                   route: routes.getModel().findOne({depart: "ICN", destination: "ATL"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 21, 13, 55) },
                    { flightCode: "HA51",   airline: airlines.getModel().findOne({name: "Hainan Airlines"}),            aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 787-9 Dreamliner"}),         route: routes.getModel().findOne({depart: "PEK", destination: "SEA"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 22, 10, 20) },
                    { flightCode: "AC875",  airline: airlines.getModel().findOne({name: "Air Canada"}),                 aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A330-300"}),                 route: routes.getModel().findOne({depart: "CDG", destination: "YVR"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 22, 16, 45) },
                    { flightCode: "SU102",  airline: airlines.getModel().findOne({name: "Aeroflot"}),                   aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 777-300ER"}),                route: routes.getModel().findOne({depart: "SVO", destination: "JFK"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 23, 9, 55) },
                    { flightCode: "CA985",  airline: airlines.getModel().findOne({name: "Air China"}),                  aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 747-8I"}),                   route: routes.getModel().findOne({depart: "PEK", destination: "LAX"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 23, 20, 30) },
                    { flightCode: "CZ327",  airline: airlines.getModel().findOne({name: "China Southern Airlines"}),    aircraft: aircrafts.getModel().findOne({aircraftModel: "Airbus A350-900"}),                 route: routes.getModel().findOne({depart: "CAN", destination: "LAX"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 24, 14, 15) },
                    { flightCode: "MU587",  airline: airlines.getModel().findOne({name: "China Eastern Airlines"}),     aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 777-300ER"}),                route: routes.getModel().findOne({depart: "PVG", destination: "JFK"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 24, 19, 45) },
                    { flightCode: "FR5567", airline: airlines.getModel().findOne({name: "Ryanair"}),                    aircraft: aircrafts.getModel().findOne({aircraftModel: "Boeing 737-800"}),                  route: routes.getModel().findOne({depart: "DUB", destination: "BCN"}), tickets: "Tickets[]", departTime: new Date(2025, 4, 25, 6, 30) }
                ]);
                return flightsData;
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
                console.log("Adding some test tickets into the database");
                let s1 = tickets
                    .getModel()
                    .create({
                        user: users.getModel().findOne({username: "micbos71"}),
                        seat: seats.getModel().findOne({numberSeat: "A1"}),
                        flight: flights.getModel().findOne({flightCode: "AC875"}), /* Paris CDG ->  Vancouver YVR */
                        numCabinBag: 2,
                        numCheckedLuggages: 1,
                        price: 349.99,
                    });
                let s2 = tickets
                    .getModel()
                    .create({
                        user: users.getModel().findOne({username: "bordjack47"}),
                        seat: seats.getModel().findOne({numberSeat: "B1"}),
                        flight: flights.getModel().findOne({flightCode: "EK202"}), /* New York JFK -> Dubai DXB */
                        numCabinBag: 1,
                        numCheckedLuggages: 0,
                        price: 149.99,
                    });
                let s3 = tickets
                    .getModel()
                    .create({
                        user: users.getModel().findOne({username: "tito_paul"}),
                        seat: seats.getModel().findOne({numberSeat: "C1"}),
                        flight: flights.getModel().findOne({flightCode: "AF9"}), /* Paris CDG -> Los Angeles LAX */
                        numCabinBag: 2,
                        numCheckedLuggages: 2,
                        price: 1999.99,
                    });
                return Promise.all([s1, s2, s3]);
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
                let airlinesData = airlines.getModel().create([
                    { username: "ITA Airways",                      passportID: "ITA",              mail: "ita.airways@project_flight.it",                          roles: ["airline"] },
                    { username: "Qatar Airways",                    passportID: "QATAR",            mail: "qatar.airways@project_flight.it",                        roles: ["airline"] },
                    { username: "Singapore Airlines",               passportID: "SINGAPORE",        mail: "singapore.airlines@project_flight.it",                   roles: ["airline"] },
                    { username: "Emirates",                         passportID: "EMIRATES",         mail: "emirates.airlines@project_flight.it",                    roles: ["airline"] },
                    { username: "ANA All Nippon Airways",           passportID: "ANA",              mail: "ana.airlines@project_flight.it",                         roles: ["airline"] },
                    { username: "Cathay Pacific",                   passportID: "CATHAY",           mail: "cathay.pacific@project_flight.it",                       roles: ["airline"] },
                    { username: "Japan Airlines",                   passportID: "JAPAN",            mail: "japan.airlines@project_flight.it",                       roles: ["airline"] },
                    { username: "Turkish Airlines",                 passportID: "TURKISH",          mail: "turkish.airlines@project_flight.it",                     roles: ["airline"] },
                    { username: "Air France",                       passportID: "AIRFRANCE",        mail: "airfrance.airlines@project_flight.it",                   roles: ["airline"] },
                    { username: "British Airways",                  passportID: "BRITISH",          mail: "british.airways@project_flight.it",                      roles: ["airline"] },
                    { username: "Lufthansa",                        passportID: "LUFTHANSA",        mail: "lufthansa.fluggesellschaften@project_flight.it",         roles: ["airline"] },
                    { username: "Swiss International Air Lines",    passportID: "SWISS",            mail: "swiss.airlines@project_flight.it",                       roles: ["airline"] },
                    { username: "KLM Royal Dutch Airlines",         passportID: "KLM",              mail: "klm.airlines@project_flight.it",                         roles: ["airline"] },
                    { username: "Delta Air Lines",                  passportID: "DELTA",            mail: "delta.airlines@project_flight.it",                       roles: ["airline"] },
                    { username: "United Airlines",                  passportID: "UNITED",           mail: "united.airlines@project_flight.it",                      roles: ["airline"] },
                    { username: "American Airlines",                passportID: "AMERICAN",         mail: "american.airlines@project_flight.it",                    roles: ["airline"] },
                    { username: "EVA Air",                          passportID: "EVA",              mail: "eva.air@project_flight.it",                              roles: ["airline"] },
                    { username: "Qantas Airways",                   passportID: "QANTAS",           mail: "qantas.airways@project_flight.it",                       roles: ["airline"] },
                    { username: "Etihad Airways",                   passportID: "ETIHAD",           mail: "etihad.airways@project_flight.it",                       roles: ["airline"] },
                    { username: "Korean Air",                       passportID: "KOREAN",           mail: "korean.air@project_flight.it",                           roles: ["airline"] },
                    { username: "Hainan Airlines",                  passportID: "HAINAN",           mail: "hainan.airlines@project_flight.it",                      roles: ["airline"] },
                    { username: "Air Canada",                       passportID: "AIRCANADA",        mail: "aircanada@project_flight.it",                            roles: ["airline"] },
                    { username: "Aeroflot",                         passportID: "AEROFLOT",         mail: "aeroflot@project_flight.it",                             roles: ["airline"] },
                    { username: "Air China",                        passportID: "AIRCHINA",         mail: "airchina@project_flight.it",                             roles: ["airline"] },
                    { username: "China Southern Airlines",          passportID: "CHINASOUTHERN",    mail: "chinasouthern@project_flight.it",                        roles: ["airline"] },
                    { username: "China Eastern Airlines",           passportID: "CHINAEASTERN",     mail: "chinaeastern@project_flight.it",                         roles: ["airline"] },
                    { username: "Ryanair",                          passportID: "RYANAIR",          mail: "ryanair@project_flight.it",                              roles: ["airline"] },
                    { username: "EasyJet",                          passportID: "EASYJET",          mail: "easyjet@project_flight.it",                              roles: ["airline"] },
                    { username: "JetBlue Airways",                  passportID: "JETBLUE",          mail: "jetblue@project_flight.it",                              roles: ["airline"] },
                    { username: "IndiGo Airlines",                  passportID: "INDIGO",           mail: "indigo@project_flight.it",                               roles: ["airline"] },
                    { username: "Southwest Airlines",               passportID: "SOUTHWEST",        mail: "southwest@project_flight.it",                            roles: ["airline"] },
                    { username: "Alaska Airlines",                  passportID: "ALASKA",           mail: "alaska@project_flight.it",                               roles: ["airline"] },
                    { username: "Air India",                        passportID: "AIRINDIA",         mail: "airindia@project_flight.it",                             roles: ["airline"] },
                    { username: "LATAM Airlines",                   passportID: "LATAM",            mail: "latam@project_flight.it",                                roles: ["airline"] },
                    { username: "Aeroméxico",                       passportID: "AEROMEXICO",       mail: "aeromexico@project_flight.it",                           roles: ["airline"] },
                    { username: "Virgin Atlantic",                  passportID: "VIRGINATLANTIC",   mail: "virginatlantic@project_flight.it",                       roles: ["airline"] },
                    { username: "Finnair",                          passportID: "FINNAIR",          mail: "finnair@project_flight.it",                              roles: ["airline"] },
                    { username: "Scandinavian Airlines",            passportID: "SAS",              mail: "sas@project_flight.it",                                  roles: ["airline"] },
                    { username: "Air New Zealand",                  passportID: "AIRNZ",            mail: "airnz@project_flight.it",                                roles: ["airline"] },
                    { username: "Thai Airways",                     passportID: "THAI",             mail: "thai@project_flight.it",                                 roles: ["airline"] },
                    { username: "Malaysia Airlines",                passportID: "MALAYSIA",         mail: "malaysia@project_flight.it",                             roles: ["airline"] }
                ]);
                return airlinesData;
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