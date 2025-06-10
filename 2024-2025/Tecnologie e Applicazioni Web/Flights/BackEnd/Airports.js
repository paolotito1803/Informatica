"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newAirport = newAirport;
const mongoose = require("mongoose");
const airportSchema = new mongoose.Schema({
    _code: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    city: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});
airportSchema.methods.getName = function () {
    return this.name;
};
airportSchema.methods.getCity = function () {
    return this.city;
};
airportSchema.methods.setName = function (name) {
    this.name = name;
};
airportSchema.methods.setCity = function (city) {
    this.city = city;
};
function getSchema() { return airportSchema; }
// Mongoose Model
let airportModel; // This is not exposed outside the model
function getModel() {
    if (!airportModel) {
        airportModel = mongoose.model('Airports', getSchema());
    }
    return airportModel;
}
function newAirport(data) {
    let _airportModel = getModel();
    return new _airportModel(data);
}
//# sourceMappingURL=Airports.js.map