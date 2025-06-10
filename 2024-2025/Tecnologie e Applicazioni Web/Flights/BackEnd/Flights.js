"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newFlight = newFlight;
const mongoose = require("mongoose");
const flightSchema = new mongoose.Schema({
    _flightCode: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    dataOra: {
        type: mongoose.SchemaTypes.Date,
        required: true
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Routes",
        required: true
    },
    aircraft: {
        type: mongoose.Schema.Types.String,
        ref: "Aircrafts",
        required: true
    }
});
flightSchema.methods.getDateOra = function () {
    return this.dataOra;
};
flightSchema.methods.getRoute = function () {
    return this.route;
};
flightSchema.methods.getAircraft = function () {
    return this.aircraft;
};
flightSchema.methods.setOraData = function (data) {
    this.dataOra = data;
};
flightSchema.methods.setRoute = function (route) {
    this.route = route;
};
flightSchema.methods.setAircraft = function (code) {
    this.aircraft = code;
};
function getSchema() { return flightSchema; }
let flightModel;
function getModel() {
    if (!flightModel) {
        flightModel = mongoose.model('Flights', getSchema());
    }
    return flightModel;
}
function newFlight(data) {
    let _flightModel = getModel();
    return new _flightModel(data);
}
//# sourceMappingURL=Flights.js.map