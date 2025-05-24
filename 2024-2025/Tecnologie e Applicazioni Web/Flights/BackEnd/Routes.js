"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newRoute = newRoute;
const mongoose = require("mongoose");
//Defining the schema
const routeSchema = new mongoose.Schema({
    destination: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Airports",
        required: true
    },
    depart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Airports",
        required: true
    },
    length: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    layoverFuel: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Airports",
        required: false
    }
});
//Defining functions
routeSchema.methods.setDestination = function (dst) {
    this.destination = dst;
};
routeSchema.methods.setDepartment = function (dep) {
    this.depart = dep;
};
routeSchema.methods.setLayoverFuel = function (lp) {
    this.layoverFuel = lp;
};
routeSchema.methods.getDestination = function () {
    return this.destination;
};
routeSchema.methods.getDepart = function () {
    return this.depart;
};
routeSchema.methods.getLength = function () {
    if (!this.length) {
        this.length = Math.abs(Math.sqrt((this.layoverFuel.position[0] - this.depart.position[0]) ^ 2 +
            (this.layoverFuel.position[1] - this.depart.position[1]) ^ 2)
            +
                Math.sqrt((this.destination.position[0] - this.layoverFuel.position[0]) ^ 2 +
                    (this.destination.position[1] - this.layoverFuel.position[1]) ^ 2));
    }
    return this.length;
};
routeSchema.methods.getLayoverFuel = function () {
    return this.layoverFuel;
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
    let _routemodel = getModel();
    return new _routemodel(data);
}
//# sourceMappingURL=Routes.js.map