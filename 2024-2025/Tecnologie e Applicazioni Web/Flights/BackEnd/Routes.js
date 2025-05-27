"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewRoute = void 0;
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newRoute = newRoute;
const mongoose = require("mongoose");
const airports = require("./Airports");
//Defining the schema
const routeSchema = new mongoose.Schema({
    destination: {
        type: mongoose.Schema.Types.String,
        ref: "Airports",
        required: true
    },
    depart: {
        type: mongoose.Schema.Types.String,
        ref: "Airports",
        required: true
    },
    length: {
        type: mongoose.Schema.Types.Number,
        required: false
    },
    layoverFuel: {
        type: mongoose.Schema.Types.String,
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
const createNewRoute = async (depCode, arrCode, lofCode) => {
    try {
        // Recupera gli aeroporti dal database
        const dep = await airports.getAirportByCode(depCode);
        const arr = await airports.getAirportByCode(arrCode);
        const lof = await airports.getAirportByCode(lofCode);
        // Controlla che tutti gli aeroporti siano stati trovati
        if (!dep || !arr || !lof) {
            throw new Error("Uno o più aeroporti non sono stati trovati!");
        }
        // Creazione della rotta con i codici ICAO
        const newR = newRoute({
            depart: dep._ICAO,
            layoverFuel: lof._ICAO,
            destination: arr._ICAO,
        });
        // Salvataggio della rotta nel database
        await newR.save();
        console.log('Nuova rotta salvata con successo:', newR);
        return newR; // Restituisce la rotta salvata se necessario
    }
    catch (err) {
        console.error("Errore durante la creazione della rotta:", err);
        throw err; // Lancia l'errore, se opportuno
    }
};
exports.createNewRoute = createNewRoute;
//# sourceMappingURL=Routes.js.map