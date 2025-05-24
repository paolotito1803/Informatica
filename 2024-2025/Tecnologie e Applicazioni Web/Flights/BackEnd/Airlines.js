"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newAirline = newAirline;
const mongoose = require("mongoose");
const users = require("./Users");
//Defining schema
const airlineSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    aircrafts: {
        type: Array.of(),
        required: true
    },
    flights: {
        type: Array.of(),
        required: true
    },
    routes: {
        type: Array.of(),
        required: true
    },
    revenue: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
});
airlineSchema.add(users.getSchema());
//Defining functions
airlineSchema.methods.getName = function () {
    return this.name;
};
airlineSchema.methods.getRevenue = function () {
    if (!this.revenue) {
        let sumPrice = 0.0;
        for (let flight of this.flights)
            for (let ticket of flight.tickets)
                sumPrice += ticket.price;
        return sumPrice;
    }
    return this.revenue;
};
airlineSchema.methods.getAircraft = function () {
    return this.aircrafts;
};
airlineSchema.methods.getRoute = function () {
    return this.routes;
};
airlineSchema.methods.getFlight = function () {
    return this.flights;
};
airlineSchema.methods.setName = function (name) {
    this.name = name;
};
airlineSchema.methods.setAircraft = function (aircrafts) {
    this.aircrafts = aircrafts;
};
airlineSchema.methods.setRoute = function (routes) {
    this.routes = routes;
};
airlineSchema.methods.setFlight = function (flights) {
    this.flights = flights;
};
function getSchema() { return airlineSchema; }
// Mongoose Model
let airlineModel; // This is not exposed outside the model
function getModel() {
    if (!airlineModel) {
        airlineModel = mongoose.model('Airline', getSchema());
    }
    return airlineModel;
}
function newAirline(data) {
    let _airlineModel = getModel();
    let airLine = new _airlineModel(data);
    return airLine;
}
//# sourceMappingURL=Airlines.js.map