
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
                    { code: "ATL", city: "Atlanta",         state: "USA",               position: [33.6407, -84.4277] },
                    { code: "DXB", city: "Dubai",           state: "UAE",               position: [25.2532, 55.3657] },
                    { code: "HND", city: "Tokyo",           state: "Japan",             position: [35.5494, 139.7798] },
                    { code: "LHR", city: "London",          state: "UK",                position: [51.4700, -0.4543] },
                    { code: "DFW", city: "Dallas",          state: "USA",               position: [32.8998, -97.0403] },
                    { code: "DEN", city: "Denver",          state: "USA",               position: [39.8561, -104.6737] },
                    { code: "ORD", city: "Chicago",         state: "USA",               position: [41.9742, -87.9073] },
                    { code: "IST", city: "Istanbul",        state: "Turkey",            position: [41.2753, 28.7519] },
                    { code: "DEL", city: "Delhi",           state: "India",             position: [28.5562, 77.1000] },
                    { code: "PVG", city: "Shanghai",        state: "China",             position: [31.1443, 121.8083] },
                    { code: "LAX", city: "Los Angeles",     state: "USA",               position: [33.9416, -118.4085] },
                    { code: "SIN", city: "Singapore",       state: "Singapore",         position: [1.3644, 103.9915] },
                    { code: "CDG", city: "Paris",           state: "France",            position: [49.0097, 2.5479] },
                    { code: "FRA", city: "Frankfurt",       state: "Germany",           position: [50.0379, 8.5622] },
                    { code: "MUC", city: "Munich",          state: "Germany",           position: [48.3537, 11.7861] },
                    { code: "ZRH", city: "Zurich",          state: "Switzerland",       position: [47.4506, 8.5610] },
                    { code: "SYD", city: "Sydney",          state: "Australia",         position: [-33.9399, 151.1753] },
                    { code: "JFK", city: "New York",        state: "USA",               position: [40.6413, -73.7781] },
                    { code: "SFO", city: "San Francisco",   state: "USA",               position: [37.6213, -122.3790] },
                    { code: "YYZ", city: "Toronto",         state: "Canada",            position: [43.6777, -79.6248] },
                    { code: "GRU", city: "São Paulo",       state: "Brazil",            position: [-23.4319, -46.4679] },
                    { code: "EZE", city: "Buenos Aires",    state: "Argentina",         position: [-34.8222, -58.5358] },
                    { code: "HKG", city: "Hong Kong",       state: "China",             position: [22.3080, 113.9185] },
                    { code: "ICN", city: "Seoul",           state: "South Korea",       position: [37.4602, 126.4407] },
                    { code: "NRT", city: "Tokyo",           state: "Japan",             position: [35.7719, 140.3929] },
                    { code: "BKK", city: "Bangkok",         state: "Thailand",          position: [13.6811, 100.7473] },
                    { code: "DOH", city: "Doha",            state: "Qatar",             position: [25.2731, 51.6085] },
                    { code: "AMS", city: "Amsterdam",       state: "Netherlands",       position: [52.3105, 4.7683] },
                    { code: "VIE", city: "Vienna",          state: "Austria",           position: [48.1103, 16.5697] },
                    { code: "MAD", city: "Madrid",          state: "Spain",             position: [40.4722, -3.5609] },
                    { code: "BCN", city: "Barcelona",       state: "Spain",             position: [41.2974, 2.0833] },
                    { code: "MEX", city: "Mexico City",     state: "Mexico",            position: [19.4361, -99.0719] },
                    { code: "LIM", city: "Lima",            state: "Peru",              position: [-12.0219, -77.1143] },
                    { code: "JNB", city: "Johannesburg",    state: "South Africa",      position: [-26.1367, 28.2411] },
                    { code: "CPT", city: "Cape Town",       state: "South Africa",      position: [-33.9694, 18.5975] },
                    { code: "VCE", city: "Venice",          state: "Italy",             position: [45.3019, 12.2107] },
                    { code: "FCO", city: "Rome",            state: "Italy",             position: [41.8003, 12.2389] },
                    { code: "MXP", city: "Milan",           state: "Italy",             position: [45.6300, 8.7281] },
                    { code: "GIG", city: "Rio de Janeiro",  state: "Brazil",            position: [-22.8099, -43.2506] },
                    { code: "PEK", city: "Beijing",         state: "China",             position: [40.0801, 116.5846] },
                    { code: "KUL", city: "Kuala Lumpur",    state: "Malaysia",          position: [2.7456, 101.7099] },
                    { code: "IST", city: "Istanbul",        state: "Turkey",            position: [41.2753, 28.7519] },
                    { code: "DME", city: "Moscow",          state: "Russia",            position: [55.4088, 37.9063] },
                    { code: "SVO", city: "Moscow",          state: "Russia",            position: [55.9726, 37.4146] },
                    { code: "LED", city: "Saint Petersburg", state: "Russia",           position: [59.8003, 30.2625] },
                    { code: "CUN", city: "Cancún",          state: "Mexico",            position: [21.0365, -86.8771] },
                    { code: "MIA", city: "Miami",           state: "USA",               position: [25.7959, -80.2870] },
                    { code: "BOS", city: "Boston",          state: "USA",               position: [42.3656, -71.0096] },
                    { code: "PHX", city: "Phoenix",         state: "USA",               position: [33.4343, -112.0122] },
                    { code: "IAH", city: "Houston",         state: "USA",               position: [29.9902, -95.3368] },
                    { code: "DTW", city: "Detroit",         state: "USA",               position: [42.2124, -83.3534] },
                    { code: "SAN", city: "San Diego",       state: "USA",               position: [32.7336, -117.1897] },
                    { code: "MCO", city: "Orlando",         state: "USA",               position: [28.4312, -81.3081] },
                    { code: "SLC", city: "Salt Lake City",  state: "USA",               position: [40.7899, -111.9791] },
                    { code: "YVR", city: "Vancouver",       state: "Canada",            position: [49.1947, -123.1792] },
                    { code: "MEM", city: "Memphis",         state: "USA",               position: [35.0424, -89.9767] },
                    { code: "SAT", city: "San Antonio",     state: "USA",               position: [29.5337, -98.4698] },
                    { code: "TUL", city: "Tulsa",           state: "USA",               position: [36.1984, -95.8881] },
                    { code: "JAX", city: "Jacksonville",    state: "USA",               position: [30.4941, -81.6879] },
                    { code: "BUF", city: "Buffalo",         state: "USA",               position: [42.9405, -78.7322] },
                    { code: "DUB", city: "Dublin",          state: "Ireland",           position: [53.4213, -6.2701] },
                    { code: "CPH", city: "Copenhagen",      state: "Denmark",           position: [55.6181, 12.6561] },
                    { code: "OSL", city: "Oslo",            state: "Norway",            position: [60.1939, 11.1004] },
                    { code: "ARN", city: "Stockholm",       state: "Sweden",            position: [59.6519, 17.9186] },
                    { code: "HEL", city: "Helsinki",        state: "Finland",           position: [60.3172, 24.9633] },
                    { code: "PRG", city: "Prague",          state: "Czech Republic",    position: [50.1008, 14.2600] },
                    { code: "BRU", city: "Brussels",        state: "Belgium",           position: [50.9010, 4.4844] },
                    { code: "LIS", city: "Lisbon",          state: "Portugal",          position: [38.7742, -9.1342] },
                    { code: "ATH", city: "Athens",          state: "Greece",            position: [37.9364, 23.9445] },
                    { code: "SOF", city: "Sofia",           state: "Bulgaria",          position: [42.6952, 23.4021] },
                    { code: "BOM", city: "Mumbai",          state: "India",             position: [19.0896, 72.8656] },
                    { code: "SGN", city: "Ho Chi Minh City", state: "Vietnam",          position: [10.8185, 106.6519] },
                    { code: "MNL", city: "Manila",          state: "Philippines",       position: [14.5086, 121.0198] },
                    { code: "TPE", city: "Taipei",          state: "Taiwan",            position: [25.0777, 121.2325] },
                    { code: "JED", city: "Jeddah",          state: "Saudi Arabia",      position: [21.6796, 39.1565] },
                    { code: "RUH", city: "Riyadh",          state: "Saudi Arabia",      position: [24.9576, 46.6988] },
                    { code: "BOG", city: "Bogotá",          state: "Colombia",          position: [4.7016, -74.1469] },
                    { code: "SCL", city: "Santiago",        state: "Chile",             position: [-33.3930, -70.7856] },
                    { code: "UIO", city: "Quito",           state: "Ecuador",           position: [-0.1292, -78.3575] },
                    { code: "PTY", city: "Panama City",     state: "Panama",            position: [9.0714, -79.3835] },
                    { code: "CAI", city: "Cairo",           state: "Egypt",             position: [30.1219, 31.4056] },
                    { code: "NBO", city: "Nairobi",         state: "Kenya",             position: [-1.3192, 36.9275] },
                    { code: "LOS", city: "Lagos",           state: "Nigeria",           position: [6.5774, 3.3212] },
                    { code: "ACC", city: "Accra",           state: "Ghana",             position: [5.6052, -0.1668] },
                    { code: "DAR", city: "Dar es Salaam",   state: "Tanzania",          position: [-6.8751, 39.2026] },
                    { code: "ADD", city: "Addis Abeba",     state: "Ethiopia",          position: [8.9779, 38.7993] },
                    { code: "CMN", city: "Casablanca",      state: "Morocco",           position: [33.3675, -7.5899] },
                    { code: "DKR", city: "Dakar",           state: "Senegal",           position: [14.7397, -17.4902] }
                ]);
                return airportsData;
            }
        }
    ).then(
        () => {
            return aircrafts.getModel().countDocuments()
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
            return routes.getModel().countDocuments({})
        }
    ).then(
        (count) => { //dati di test per tutti i documenti
            if (count == 0) {
                console.log("Adding some test routes into the database");
                /*
                    - { code: "ATL", city: "Atlanta",         state: "USA",               position: [33.6407, -84.4277] },
                    - { code: "DXB", city: "Dubai",           state: "UAE",               position: [25.2532, 55.3657] },
                    - { code: "HND", city: "Tokyo",           state: "Japan",             position: [35.5494, 139.7798] },
                    - { code: "LHR", city: "London",          state: "UK",                position: [51.4700, -0.4543] },
                    { code: "DFW", city: "Dallas",          state: "USA",               position: [32.8998, -97.0403] },
                    { code: "DEN", city: "Denver",          state: "USA",               position: [39.8561, -104.6737] },
                    { code: "ORD", city: "Chicago",         state: "USA",               position: [41.9742, -87.9073] },
                    { code: "IST", city: "Istanbul",        state: "Turkey",            position: [41.2753, 28.7519] },
                    { code: "DEL", city: "Delhi",           state: "India",             position: [28.5562, 77.1000] },
                    { code: "PVG", city: "Shanghai",        state: "China",             position: [31.1443, 121.8083] },
                    { code: "LAX", city: "Los Angeles",     state: "USA",               position: [33.9416, -118.4085] },
                    { code: "SIN", city: "Singapore",       state: "Singapore",         position: [1.3644, 103.9915] },
                    { code: "CDG", city: "Paris",           state: "France",            position: [49.0097, 2.5479] },
                    { code: "FRA", city: "Frankfurt",       state: "Germany",           position: [50.0379, 8.5622] },
                    { code: "MUC", city: "Munich",          state: "Germany",           position: [48.3537, 11.7861] },
                    { code: "ZRH", city: "Zurich",          state: "Switzerland",       position: [47.4506, 8.5610] },
                    { code: "SYD", city: "Sydney",          state: "Australia",         position: [-33.9399, 151.1753] },
                    { code: "JFK", city: "New York",        state: "USA",               position: [40.6413, -73.7781] },
                    { code: "SFO", city: "San Francisco",   state: "USA",               position: [37.6213, -122.3790] },
                    { code: "YYZ", city: "Toronto",         state: "Canada",            position: [43.6777, -79.6248] },
                    { code: "GRU", city: "São Paulo",       state: "Brazil",            position: [-23.4319, -46.4679] },
                    { code: "EZE", city: "Buenos Aires",    state: "Argentina",         position: [-34.8222, -58.5358] },
                    { code: "HKG", city: "Hong Kong",       state: "China",             position: [22.3080, 113.9185] },
                    { code: "ICN", city: "Seoul",           state: "South Korea",       position: [37.4602, 126.4407] },
                    { code: "NRT", city: "Tokyo",           state: "Japan",             position: [35.7719, 140.3929] },
                    { code: "BKK", city: "Bangkok",         state: "Thailand",          position: [13.6811, 100.7473] },
                    { code: "DOH", city: "Doha",            state: "Qatar",             position: [25.2731, 51.6085] },
                    { code: "AMS", city: "Amsterdam",       state: "Netherlands",       position: [52.3105, 4.7683] },
                    { code: "VIE", city: "Vienna",          state: "Austria",           position: [48.1103, 16.5697] },
                    { code: "MAD", city: "Madrid",          state: "Spain",             position: [40.4722, -3.5609] },
                    { code: "BCN", city: "Barcelona",       state: "Spain",             position: [41.2974, 2.0833] },
                    { code: "MEX", city: "Mexico City",     state: "Mexico",            position: [19.4361, -99.0719] },
                    { code: "LIM", city: "Lima",            state: "Peru",              position: [-12.0219, -77.1143] },
                    { code: "JNB", city: "Johannesburg",    state: "South Africa",      position: [-26.1367, 28.2411] },
                    { code: "CPT", city: "Cape Town",       state: "South Africa",      position: [-33.9694, 18.5975] },
                    { code: "VCE", city: "Venice",          state: "Italy",             position: [45.3019, 12.2107] },
                    { code: "FCO", city: "Rome",            state: "Italy",             position: [41.8003, 12.2389] },
                    { code: "MXP", city: "Milan",           state: "Italy",             position: [45.6300, 8.7281] },
                    { code: "GIG", city: "Rio de Janeiro",  state: "Brazil",            position: [-22.8099, -43.2506] },
                    { code: "PEK", city: "Beijing",         state: "China",             position: [40.0801, 116.5846] },
                    { code: "KUL", city: "Kuala Lumpur",    state: "Malaysia",          position: [2.7456, 101.7099] },
                    { code: "IST", city: "Istanbul",        state: "Turkey",            position: [41.2753, 28.7519] },
                    { code: "DME", city: "Moscow",          state: "Russia",            position: [55.4088, 37.9063] },
                    { code: "SVO", city: "Moscow",          state: "Russia",            position: [55.9726, 37.4146] },
                    { code: "LED", city: "Saint Petersburg", state: "Russia",           position: [59.8003, 30.2625] },
                    { code: "CUN", city: "Cancún",          state: "Mexico",            position: [21.0365, -86.8771] },
                    { code: "MIA", city: "Miami",           state: "USA",               position: [25.7959, -80.2870] },
                    { code: "BOS", city: "Boston",          state: "USA",               position: [42.3656, -71.0096] },
                    { code: "PHX", city: "Phoenix",         state: "USA",               position: [33.4343, -112.0122] },
                    { code: "IAH", city: "Houston",         state: "USA",               position: [29.9902, -95.3368] },
                    { code: "DTW", city: "Detroit",         state: "USA",               position: [42.2124, -83.3534] },
                    { code: "SAN", city: "San Diego",       state: "USA",               position: [32.7336, -117.1897] },
                    { code: "MCO", city: "Orlando",         state: "USA",               position: [28.4312, -81.3081] },
                    { code: "SLC", city: "Salt Lake City",  state: "USA",               position: [40.7899, -111.9791] },
                    { code: "YVR", city: "Vancouver",       state: "Canada",            position: [49.1947, -123.1792] },
                    { code: "MEM", city: "Memphis",         state: "USA",               position: [35.0424, -89.9767] },
                    { code: "SAT", city: "San Antonio",     state: "USA",               position: [29.5337, -98.4698] },
                    { code: "TUL", city: "Tulsa",           state: "USA",               position: [36.1984, -95.8881] },
                    { code: "JAX", city: "Jacksonville",    state: "USA",               position: [30.4941, -81.6879] },
                    { code: "BUF", city: "Buffalo",         state: "USA",               position: [42.9405, -78.7322] },
                    { code: "DUB", city: "Dublin",          state: "Ireland",           position: [53.4213, -6.2701] },
                    { code: "CPH", city: "Copenhagen",      state: "Denmark",           position: [55.6181, 12.6561] },
                    { code: "OSL", city: "Oslo",            state: "Norway",            position: [60.1939, 11.1004] },
                    { code: "ARN", city: "Stockholm",       state: "Sweden",            position: [59.6519, 17.9186] },
                    { code: "HEL", city: "Helsinki",        state: "Finland",           position: [60.3172, 24.9633] },
                    { code: "PRG", city: "Prague",          state: "Czech Republic",    position: [50.1008, 14.2600] },
                    { code: "BRU", city: "Brussels",        state: "Belgium",           position: [50.9010, 4.4844] },
                    { code: "LIS", city: "Lisbon",          state: "Portugal",          position: [38.7742, -9.1342] },
                    { code: "ATH", city: "Athens",          state: "Greece",            position: [37.9364, 23.9445] },
                    { code: "SOF", city: "Sofia",           state: "Bulgaria",          position: [42.6952, 23.4021] },
                    { code: "BOM", city: "Mumbai",          state: "India",             position: [19.0896, 72.8656] },
                    { code: "SGN", city: "Ho Chi Minh City", state: "Vietnam",          position: [10.8185, 106.6519] },
                    { code: "MNL", city: "Manila",          state: "Philippines",       position: [14.5086, 121.0198] },
                    { code: "TPE", city: "Taipei",          state: "Taiwan",            position: [25.0777, 121.2325] },
                    { code: "JED", city: "Jeddah",          state: "Saudi Arabia",      position: [21.6796, 39.1565] },
                    { code: "RUH", city: "Riyadh",          state: "Saudi Arabia",      position: [24.9576, 46.6988] },
                    { code: "BOG", city: "Bogotá",          state: "Colombia",          position: [4.7016, -74.1469] },
                    { code: "SCL", city: "Santiago",        state: "Chile",             position: [-33.3930, -70.7856] },
                    { code: "UIO", city: "Quito",           state: "Ecuador",           position: [-0.1292, -78.3575] },
                    { code: "PTY", city: "Panama City",     state: "Panama",            position: [9.0714, -79.3835] },
                    { code: "CAI", city: "Cairo",           state: "Egypt",             position: [30.1219, 31.4056] },
                    { code: "NBO", city: "Nairobi",         state: "Kenya",             position: [-1.3192, 36.9275] },
                    { code: "LOS", city: "Lagos",           state: "Nigeria",           position: [6.5774, 3.3212] },
                    { code: "ACC", city: "Accra",           state: "Ghana",             position: [5.6052, -0.1668] },
                    { code: "DAR", city: "Dar es Salaam",   state: "Tanzania",          position: [-6.8751, 39.2026] },
                    { code: "ADD", city: "Addis Abeba",     state: "Ethiopia",          position: [8.9779, 38.7993] },
                    { code: "CMN", city: "Casablanca",      state: "Morocco",           position: [33.3675, -7.5899] },
                    { code: "DKR", city: "Dakar",           state: "Senegal",           position: [14.7397, -17.4902] }
                 */

                let ATL: any
                (async () => {ATL=await airports.getAirportByCode("ATL")})();
                let DXB: any
                (async () => {DXB=await airports.getAirportByCode("DXB")})();
                let HND: any
                (async () => {HND=await airports.getAirportByCode("HND")})();
                let LHR: any
                (async () => {LHR=await airports.getAirportByCode("LHR")})();
                let DFW: any;
                (async () => { DFW = await airports.getAirportByCode("DFW"); })();

                let DEN: any;
                (async () => { DEN = await airports.getAirportByCode("DEN"); })();

                let ORD: any;
                (async () => { ORD = await airports.getAirportByCode("ORD"); })();

                let IST: any;
                (async () => { IST = await airports.getAirportByCode("IST"); })();

                let DEL: any;
                (async () => { DEL = await airports.getAirportByCode("DEL"); })();

                let PVG: any;
                (async () => { PVG = await airports.getAirportByCode("PVG"); })();

                let LAX: any;
                (async () => { LAX = await airports.getAirportByCode("LAX"); })();

                let SIN: any;
                (async () => { SIN = await airports.getAirportByCode("SIN"); })();

                let CDG: any;
                (async () => { CDG = await airports.getAirportByCode("CDG"); })();

                let FRA: any;
                (async () => { FRA = await airports.getAirportByCode("FRA"); })();

                let MUC: any;
                (async () => { MUC = await airports.getAirportByCode("MUC"); })();

                let ZRH: any;
                (async () => { ZRH = await airports.getAirportByCode("ZRH"); })();

                let SYD: any;
                (async () => { SYD = await airports.getAirportByCode("SYD"); })();

                let JFK: any;
                (async () => { JFK = await airports.getAirportByCode("JFK"); })();

                let SFO: any;
                (async () => { SFO = await airports.getAirportByCode("SFO"); })();

                let YYZ: any;
                (async () => { YYZ = await airports.getAirportByCode("YYZ"); })();

                let GRU: any;
                (async () => { GRU = await airports.getAirportByCode("GRU"); })();

                let EZE: any;
                (async () => { EZE = await airports.getAirportByCode("EZE"); })();

                let HKG: any;
                (async () => { HKG = await airports.getAirportByCode("HKG"); })();

                let ICN: any;
                (async () => { ICN = await airports.getAirportByCode("ICN"); })();

                let NRT: any;
                (async () => { NRT = await airports.getAirportByCode("NRT"); })();

                let BKK: any;
                (async () => { BKK = await airports.getAirportByCode("BKK"); })();

                let DOH: any;
                (async () => { DOH = await airports.getAirportByCode("DOH"); })();

                let AMS: any;
                (async () => { AMS = await airports.getAirportByCode("AMS"); })();

                let VIE: any;
                (async () => { VIE = await airports.getAirportByCode("VIE"); })();

                let MAD: any;
                (async () => { MAD = await airports.getAirportByCode("MAD"); })();

                let BCN: any;
                (async () => { BCN = await airports.getAirportByCode("BCN"); })();

                let MEX: any;
                (async () => { MEX = await airports.getAirportByCode("MEX"); })();

                let LIM: any;
                (async () => { LIM = await airports.getAirportByCode("LIM"); })();

                let JNB: any;
                (async () => { JNB = await airports.getAirportByCode("JNB"); })();

                let CPT: any;
                (async () => { CPT = await airports.getAirportByCode("CPT"); })();

                let VCE: any;
                (async () => { VCE = await airports.getAirportByCode("VCE"); })();

                let FCO: any;
                (async () => { FCO = await airports.getAirportByCode("FCO"); })();

                let MXP: any;
                (async () => { MXP = await airports.getAirportByCode("MXP"); })();

                let GIG: any;
                (async () => { GIG = await airports.getAirportByCode("GIG"); })();

                let PEK: any;
                (async () => { PEK = await airports.getAirportByCode("PEK"); })();

                let KUL: any;
                (async () => { KUL = await airports.getAirportByCode("KUL"); })();

                let DME: any;
                (async () => { DME = await airports.getAirportByCode("DME"); })();

                let SVO: any;
                (async () => { SVO = await airports.getAirportByCode("SVO"); })();

                let LED: any;
                (async () => { LED = await airports.getAirportByCode("LED"); })();

                let CUN: any;
                (async () => { CUN = await airports.getAirportByCode("CUN"); })();

                let MIA: any;
                (async () => { MIA = await airports.getAirportByCode("MIA"); })();

                let BOS: any;
                (async () => { BOS = await airports.getAirportByCode("BOS"); })();

                let PHX: any;
                (async () => { PHX = await airports.getAirportByCode("PHX"); })();

                let IAH: any;
                (async () => { IAH = await airports.getAirportByCode("IAH"); })();

                let DTW: any;
                (async () => { DTW = await airports.getAirportByCode("DTW"); })();

                let SAN: any;
                (async () => { SAN = await airports.getAirportByCode("SAN"); })();

                let MCO: any;
                (async () => { MCO = await airports.getAirportByCode("MCO"); })();

                let SLC: any;
                (async () => { SLC = await airports.getAirportByCode("SLC"); })();

                let YVR: any;
                (async () => { YVR = await airports.getAirportByCode("YVR"); })();

                let MEM: any;
                (async () => { MEM = await airports.getAirportByCode("MEM"); })();

                let SAT: any;
                (async () => { SAT = await airports.getAirportByCode("SAT"); })();

                let TUL: any;
                (async () => { TUL = await airports.getAirportByCode("TUL"); })();

                let JAX: any;
                (async () => { JAX = await airports.getAirportByCode("JAX"); })();

                let BUF: any;
                (async () => { BUF = await airports.getAirportByCode("BUF"); })();

                let DUB: any;
                (async () => { DUB = await airports.getAirportByCode("DUB"); })();

                let CPH: any;
                (async () => { CPH = await airports.getAirportByCode("CPH"); })();

                let OSL: any;
                (async () => { OSL = await airports.getAirportByCode("OSL"); })();

                let ARN: any;
                (async () => { ARN = await airports.getAirportByCode("ARN"); })();

                let HEL: any;
                (async () => { HEL = await airports.getAirportByCode("HEL"); })();

                let PRG: any;
                (async () => { PRG = await airports.getAirportByCode("PRG"); })();

                let BRU: any;
                (async () => { BRU = await airports.getAirportByCode("BRU"); })();

                let LIS: any;
                (async () => { LIS = await airports.getAirportByCode("LIS"); })();

                let ATH: any;
                (async () => { ATH = await airports.getAirportByCode("ATH"); })();

                let SOF: any;
                (async () => { SOF = await airports.getAirportByCode("SOF"); })();

                let BOM: any;
                (async () => { BOM = await airports.getAirportByCode("BOM"); })();

                let SGN: any;
                (async () => { SGN = await airports.getAirportByCode("SGN"); })();

                let MNL: any;
                (async () => { MNL = await airports.getAirportByCode("MNL"); })();

                let TPE: any;
                (async () => { TPE = await airports.getAirportByCode("TPE"); })();

                let JED: any;
                (async () => { JED = await airports.getAirportByCode("JED"); })();

                let RUH: any;
                (async () => { RUH = await airports.getAirportByCode("RUH"); })();

                let BOG: any;
                (async () => { BOG = await airports.getAirportByCode("BOG"); })();

                let SCL: any;
                (async () => { SCL = await airports.getAirportByCode("SCL"); })();

                let UIO: any;
                (async () => { UIO = await airports.getAirportByCode("UIO"); })();

                let PTY: any;
                (async () => { PTY = await airports.getAirportByCode("PTY"); })();

                let CAI: any;
                (async () => { CAI = await airports.getAirportByCode("CAI"); })();

                let NBO: any;
                (async () => { NBO = await airports.getAirportByCode("NBO"); })();

                let LOS: any;
                (async () => { LOS = await airports.getAirportByCode("LOS"); })();

                let ACC: any;
                (async () => { ACC = await airports.getAirportByCode("ACC"); })();

                let DAR: any;
                (async () => { DAR = await airports.getAirportByCode("DAR"); })();

                let ADD: any;
                (async () => { ADD = await airports.getAirportByCode("ADD"); })();

                let CMN: any;
                (async () => { CMN = await airports.getAirportByCode("CMN"); })();

                let DKR: any;
                (async () => { DKR = await airports.getAirportByCode("DKR"); })();



                let routesData = routes.getModel().create([
                    /* Routes with stops */
                    {depart: JFK._id, layoverFuel: FRA._id, destination: VCE._id}, // USA → Italy via Frankfurt
                    {depart: SYD._id, layoverFuel: DXB._id, destination: LHR._id}, // Australia → UK via Dubai
                    {depart: LAX._id, layoverFuel: ORD._id, destination: CDG._id}, // USA → France via Chicago
                    {depart: JFK._id, layoverFuel: ICN._id, destination: HND._id}, // USA → Japan via Seoul
                    {depart: GRU._id, layoverFuel: MAD._id, destination: AMS._id}, // Brazil → Netherlands via Madrid
                    {depart: YYZ._id, layoverFuel: HKG._id, destination: SIN._id}, // Canada → Singapore via Hong Kong
                    {depart: SFO._id, layoverFuel: LHR._id, destination: FCO._id}, // USA → Italy via London
                    {depart: MEX._id, layoverFuel: NRT._id, destination: ICN._id}, // Mexico → South Korea via Tokyo Narita
                    {depart: ORD._id, layoverFuel: DOH._id, destination: JNB._id}, // USA → South Africa via Doha
                    {depart: DXB._id, layoverFuel: SIN._id, destination: SYD._id}, // UAE → Australia via Singapore
                    {depart: ATL._id, layoverFuel: LAX._id, destination: HND._id}, // USA → Japan via Los Angeles
                    {depart: DXB._id, layoverFuel: IST._id, destination: LHR._id}, // UAE → UK via Istanbul
                    {depart: ORD._id, layoverFuel: ICN._id, destination: SYD._id}, // USA → Australia via Seoul
                    {depart: JFK._id, layoverFuel: LAX._id, destination: SYD._id}, // USA → Australia via Los Angeles
                    {depart: LHR._id, layoverFuel: IST._id, destination: DXB._id}, // UK → UAE via Istanbul
                    {depart: ATL._id, layoverFuel: ICN._id, destination: HND._id}, // USA → Japan via Seoul
                    {depart: CDG._id, layoverFuel: MAD._id, destination: GRU._id}, // France → Brazil via Madrid
                    {depart: YYZ._id, layoverFuel: HKG._id, destination: SIN._id}, // Canada → Singapore via Hong Kong
                    {depart: ORD._id, layoverFuel: DOH._id, destination: JNB._id}, // USA → South Africa via Doha
                    {depart: MEX._id, layoverFuel: NRT._id, destination: PEK._id}, // Mexico → China via Tokyo Narita
                    {depart: EZE._id, layoverFuel: BCN._id, destination: AMS._id}, // Argentina → Netherlands via Barcelona
                    {depart: SFO._id, layoverFuel: LHR._id, destination: FCO._id}, // USA → Italy via London
                    {depart: DEL._id, layoverFuel: BKK._id, destination: ICN._id}, // India → South Korea via Bangkok

                    /* Direct routes */
                    {depart: LHR._id, destination: JFK._id}, // Londra → New York
                    {depart: SYD._id, destination: DXB._id}, // Sydney → Dubai
                    {depart: FRA._id, destination: ATL._id}, // Francoforte → Atlanta
                    {depart: HND._id, destination: SIN._id}, // Tokyo Haneda → Singapore
                    {depart: LAX._id, destination: ICN._id}, // Los Angeles → Seoul
                    {depart: YYZ._id, destination: AMS._id}, // Toronto → Amsterdam
                    {depart: CDG._id, destination: GRU._id}, // Parigi → São Paulo
                    {depart: DEL._id, destination: JNB._id}, // Delhi → Johannesburg
                    {depart: EZE._id, destination: MEX._id}, // Buenos Aires → Città del Messico
                    {depart: PEK._id, destination: SYD._id}, // Pechino → Sydney

                    {depart: LAX._id, destination: JFK._id}, // Los Angeles → New York
                    {depart: ATL._id, destination: ORD._id}, // Atlanta → Chicago
                    {depart: DEN._id, destination: DFW._id}, // Denver → Dallas
                    {depart: MEX._id, destination: YYZ._id}, // Toronto → Mexico City

                    {depart: CDG._id, destination: LHR._id}, // Parigi → Londra
                    {depart: FRA._id, destination: AMS._id}, // Francoforte → Amsterdam
                    {depart: BCN._id, destination: MAD._id}, // Barcellona → Madrid
                    {depart: ZRH._id, destination: VIE._id}, // Zurigo → Vienna
                    {depart: FCO._id, destination: MXP._id}, // Milano → Roma

                    {depart: SIN._id, destination: MXP._id}, // Milano Malpensa → Singapore
                    {depart: PVG._id, destination: ICN._id}, // Shanghai → Seoul
                    {depart: BKK._id, destination: SIN._id}, // Bangkok → Singapore
                    {depart: PEK._id, destination: DEL._id}, // Pechino → Delhi
                    {depart: DOH._id, destination: KUL._id}, // Kuala Lumpur → Doha

                    {depart: EZE._id, destination: GRU._id}, // Buenos Aires → São Paulo
                    {depart: MEX._id, destination: LIM._id}, // Città del Messico → Lima
                    {depart: BOG._id, destination: GIG._id}, // Bogotá → Rio de Janeiro
                    {depart: UIO._id, destination: SCL._id}, // Quito → Santiago del Cile
                    {depart: PTY._id, destination: CUN._id}, // Cancún → Panama City

                    {depart: CPT._id, destination: JNB._id}, // Cape Town → Johannesburg
                    {depart: NBO._id, destination: CAI._id}, // Nairobi → Cairo
                    {depart: ACC._id, destination: LOS._id}, // Accra → Lagos
                    {depart: ADD._id, destination: DAR._id}, // Addis Abeba → Dar es Salaam
                    {depart: DKR._id, destination: CMN._id}  // Dakar → Casablanca
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