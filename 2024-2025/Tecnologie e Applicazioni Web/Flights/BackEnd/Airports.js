"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newAirport = newAirport;
const mongoose = require("mongoose");
//Defining Schema
const airportSchema = new mongoose.Schema({
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
//# sourceMappingURL=Airports.js.map