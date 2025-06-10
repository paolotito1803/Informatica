"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newAircraft = newAircraft;
const mongoose = require("mongoose");
const aircraftSchema = new mongoose.Schema({
    _numAircraft: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    seats: {
        type: Array.of(),
        required: true
    },
    modello: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});
aircraftSchema.methods.getSeats = function () {
    return this.seats;
};
aircraftSchema.methods.getModello = function () {
    return this.modello;
};
aircraftSchema.methods.setSeats = function (seats) {
    this.seats = seats;
};
aircraftSchema.methods.setModello = function (modello) {
    this, modello = modello;
};
function getSchema() { return aircraftSchema; }
let aircraftModel;
function getModel() {
    if (!aircraftModel) {
        aircraftModel = mongoose.model('Aircrafts', getSchema());
    }
    return aircraftModel;
}
function newAircraft(data) {
    let _aircraftModel = getModel();
    return new _aircraftModel(data);
}
//# sourceMappingURL=Aircrafts.js.map