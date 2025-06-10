"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newRoute = newRoute;
const mongoose = require("mongoose");
const routeSchema = new mongoose.Schema({
    destination: {
        type: mongoose.Schema.Types.String,
        ref: "Airports",
        required: true
    },
    departure: {
        type: mongoose.Schema.Types.String,
        ref: "Airports",
        required: true
    },
    layoverFuel: {
        type: Array.of()
    }
});
routeSchema.methods.getDestination = function () {
    return this.destination;
};
routeSchema.methods.setDestination = function (dest) {
    this.destination = dest;
};
routeSchema.methods.getDeparture = function () {
    return this.departure;
};
routeSchema.methods.setDeparture = function (depart) {
    this.departure = depart;
};
routeSchema.methods.getLayoverFuel = function () {
    return this.layoverFuel;
};
routeSchema.methods.setLayoverFuel = function (layoverFuel) {
    this.layoverFuel = layoverFuel;
};
function getSchema() { return routeSchema; }
// Mongoose Model
let routeModel; // This is not exposed outside the model
function getModel() {
    if (!routeModel) {
        routeModel = mongoose.model('Route', getSchema());
    }
    return routeModel;
}
function newRoute(data) {
    let _routeModel = getModel();
    return new _routeModel(data);
}
//# sourceMappingURL=Routes.js.map