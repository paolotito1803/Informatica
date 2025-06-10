"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newSeat = newSeat;
const mongoose = require("mongoose");
const seatSchema = new mongoose.Schema({
    _numSeat: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    legroom: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    isFree: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: true
    },
    class: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});
seatSchema.methods.getClass = function () {
    return this.class;
};
seatSchema.methods.getLegroom = function () {
    return this.legroom;
};
seatSchema.methods.getIsFree = function () {
    return this.isFree;
};
seatSchema.methods.setClass = function (clas) {
    this.class = clas;
};
seatSchema.methods.setLegroom = function (legroom) {
    this.legroom = legroom;
};
seatSchema.methods.setIsFree = function () {
    this.isFree = !this.isFree;
};
function getSchema() { return seatSchema; }
// Mongoose Model
let seatModel; // This is not exposed outside the model
function getModel() {
    if (!seatModel) {
        seatModel = mongoose.model('Seats', getSchema());
    }
    return seatModel;
}
function newSeat(data) {
    let _seatModel = getModel();
    return new _seatModel(data);
}
//# sourceMappingURL=Seats.js.map