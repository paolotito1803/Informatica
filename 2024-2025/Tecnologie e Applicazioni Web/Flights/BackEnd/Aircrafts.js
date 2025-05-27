"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newAircraft = newAircraft;
const mongoose = require("mongoose");
//Defining Schema
const aircraftSchema = new mongoose.Schema({
    aircraftID: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    aircraftModel: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    seat: {
        type: Array(),
        required: true,
        unique: true
    }
});
//Defining Functions
aircraftSchema.methods.getaircraftModel = function () {
    return this.aircraftModel;
};
aircraftSchema.methods.getSeat = function () {
    return this.seat;
};
aircraftSchema.methods.setaircraftModel = function (aircraftModel) {
    this.aircraftModel = aircraftModel;
};
aircraftSchema.methods.setSeat = function (seat) {
    this.seat = seat;
};
function getSchema() { return aircraftSchema; }
// Mongoose Model
let aircraftModel; // This is not exposed outside the model
function getModel() {
    if (!aircraftModel) {
        aircraftModel = mongoose.model('Aircraft', getSchema());
    }
    return aircraftModel;
}
function newAircraft(data) {
    let _aircraftModel = getModel();
    return new _aircraftModel(data);
}
//# sourceMappingURL=Aircrafts.js.map