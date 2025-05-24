"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newTicket = newTicket;
const mongoose = require("mongoose");
//Defining Schema
const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    seat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seats',
        required: true,
        unique: true
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flights',
        required: true,
        unique: true
    },
    numCabinBag: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    numCheckedLuggages: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
});
//Defining Functions
ticketSchema.methods.getUser = function () {
    return this.user;
};
ticketSchema.methods.getFlight = function () {
    return this.flight;
};
ticketSchema.methods.getSeat = function () {
    return this.seat;
};
ticketSchema.methods.getNumCabinBag = function () {
    return this.numCabinBag;
};
ticketSchema.methods.getNumCheckedLuggages = function () {
    return this.numCheckedLuggages;
};
ticketSchema.methods.getPrice = function () {
    return this.price;
};
ticketSchema.methods.setUser = function (user) {
    this.user = user;
};
ticketSchema.methods.setFlight = function (flight) {
    this.flight = flight;
};
ticketSchema.methods.setSeat = function (seat) {
    this.seat = seat;
};
ticketSchema.methods.setNumCabinBag = function (numCabinBag) {
    this.numCabinBag = numCabinBag;
};
ticketSchema.methods.setNumCheckedLuggages = function (numCheckedLuggages) {
    this.numCheckedLuggages = numCheckedLuggages;
};
ticketSchema.methods.setPrice = function (price) {
    this.price = price;
};
function getSchema() { return ticketSchema; }
// Mongoose Model
let ticketModel; // This is not exposed outside the model
function getModel() {
    if (!ticketModel) {
        ticketModel = mongoose.model('Ticket', getSchema());
    }
    return ticketModel;
}
function newTicket(data) {
    let _ticketModel = getModel();
    let tickets = new _ticketModel(data);
    return tickets;
}
//# sourceMappingURL=Tickets.js.map