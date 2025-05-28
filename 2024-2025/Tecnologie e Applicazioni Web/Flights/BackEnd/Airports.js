"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAirportByCode = void 0;
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newAirport = newAirport;
const mongoose = require("mongoose");
//Defining Schema
const airportSchema = new mongoose.Schema({
    _ICAO: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    code: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    city: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    state: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    position: {
        type: [mongoose.SchemaTypes.Number, mongoose.SchemaTypes.Number],
        required: true,
        unique: true
    }
});
//Defining Functions
airportSchema.methods.getCode = function () {
    return this.code;
};
airportSchema.methods.getCity = function () {
    return this.city;
};
airportSchema.methods.getState = function () {
    return this.state;
};
airportSchema.methods.getPosition = function () {
    return this.position;
};
airportSchema.methods.setCode = function (code) {
    this.code = code;
};
airportSchema.methods.setCity = function (city) {
    this.city = city;
};
airportSchema.methods.setState = function (state) {
    this.state = state;
};
airportSchema.methods.setPosition = function (position) {
    this.position = position;
};
function getSchema() { return airportSchema; }
// Mongoose Model
let airportModel; // This is not exposed outside the model
function getModel() {
    if (!airportModel) {
        airportModel = mongoose.model('Airport', getSchema());
    }
    return airportModel;
}
function newAirport(data) {
    let _airportModel = getModel();
    return new _airportModel(data);
}
const getAirportByCode = async (code) => {
    try {
        const AirportModel = getModel(); // Ottieni il modello
        // Trova l'aeroporto per codice
        let airport = AirportModel.findOne({ code: code }); // Restituisce il documento trovato
        if (!airport) {
            console.error("Airport " + code + " non trovato");
        }
        return airport;
    }
    catch (err) {
        console.error("Errore durante il recupero dell'aeroporto:", err);
        throw err; // Rilancia l'errore se necessario
    }
};
exports.getAirportByCode = getAirportByCode;
//# sourceMappingURL=Airports.js.map