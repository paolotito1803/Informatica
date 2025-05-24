"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newFlight = newFlight;
const mongoose = require("mongoose");
//Defining Schema
const flightSchema = new mongoose.Schema({
    airline: {
        type: Array(),
        required: true
    },
    aircraft: {
        type: Array(),
        required: true
    },
    route: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Routes",
        required: true
    },
    tickets: {
        type: Array(),
        required: true
    },
    departTime: {
        type: Date,
        required: true
    }
});
//Defining Functions
flightSchema.methods.getAirline = function () {
    return this.airline;
};
flightSchema.methods.getAircraft = function () {
    return this.aircraft;
};
flightSchema.methods.getTickets = function () {
    return this.ticket;
};
flightSchema.methods.getRoute = function () {
    return this.route;
};
flightSchema.methods.getDepartTime = function () {
    return this.departTime;
};
flightSchema.methods.setAirline = function (airline) {
    this.airline = airline;
};
flightSchema.methods.setAircraft = function (aircraft) {
    this.aircraft = aircraft;
};
flightSchema.methods.setTickets = function (tickets) {
    this.tickets = tickets;
};
flightSchema.methods.setRoutes = function (routes) {
    this.route = routes;
};
flightSchema.methods.setDepartTime = function (departTime) {
    this.departTime = departTime;
};
function getSchema() { return flightSchema; }
// Mongoose Model
let flightModel; // This is not exposed outside the model
function getModel() {
    if (!flightModel) {
        flightModel = mongoose.model('Flight', getSchema());
    }
    return flightModel;
}
function newFlight(data) {
    let _flightModel = getModel();
    let flight = new _flightModel(data);
    return flight;
}
//# sourceMappingURL=Flights.js.map