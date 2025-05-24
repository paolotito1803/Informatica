"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newSeat = newSeat;
const mongoose = require("mongoose");
//Defining Schema
const seatSchema = new mongoose.Schema({
    numberSeat: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    classes: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    legroom: {
        type: mongoose.SchemaTypes.Boolean,
        required: true
    },
    isFree: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: true,
    }
});
//Defining Functions
seatSchema.methods.getNumberSeat = function () {
    return this.numberSeat;
};
seatSchema.methods.getClasses = function () {
    return this.classes;
};
seatSchema.methods.getLegroom = function () {
    return this.legroom;
};
seatSchema.methods.isFreeSeat = function () {
    return this.isFree;
};
seatSchema.methods.setNumberSeat = function (numberSeat) {
    this.numberSeat = numberSeat;
};
seatSchema.methods.setClasses = function (classes) {
    this.classes = classes;
};
seatSchema.methods.setLegroom = function (legroom) {
    this.legroom = legroom;
};
seatSchema.methods.setSeat = function (isFree) {
    this.isFree = isFree;
};
function getSchema() { return seatSchema; }
// Mongoose Model
let seatModel; // This is not exposed outside the model
function getModel() {
    if (!seatModel) {
        seatModel = mongoose.model('Seat', getSchema());
    }
    return seatModel;
}
function newSeat(data) {
    let _seatModel = getModel();
    return new _seatModel(data);
}
//# sourceMappingURL=Seats.js.map