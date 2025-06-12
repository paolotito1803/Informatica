"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newTicket = newTicket;
const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
    _code: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    seat: {
        type: mongoose.Schema.Types.String,
        ref: "Seats",
        required: true
    },
    flight: {
        type: mongoose.Schema.Types.String,
        ref: "Flights",
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    numBag: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
});
ticketSchema.methods.getUser = function () {
    return this.user;
};
ticketSchema.methods.getSeat = function () {
    return this.seat;
};
/*ticketSchema.methods.getAirline = function() : mongoose.Schema.Types.ObjectId{
    return this.airline;
}*/
ticketSchema.methods.getFlight = function () {
    return this.flight;
};
ticketSchema.methods.getPrice = function () {
    return this.price;
};
ticketSchema.methods.getNumBag = function () {
    return this.numBag;
};
ticketSchema.methods.setUser = function (user) {
    this.user = user;
};
ticketSchema.methods.setSeat = function (seat) {
    this.seat = seat;
};
/*ticketSchema.methods.setAirline = function(airline : mongoose.Schema.Types.String){
    this.airline = airline;
}*/
ticketSchema.methods.setFlight = function (flight) {
    this.flight = flight;
};
ticketSchema.methods.setPrice = function (price) {
    this.price = price;
};
ticketSchema.methods.setNumBag = function (numBag) {
    this.numBag = numBag;
};
function getSchema() { return ticketSchema; }
// Mongoose Model
let ticketModel; // This is not exposed outside the model
function getModel() {
    if (!ticketModel) {
        ticketModel = mongoose.model('Tickets', getSchema());
    }
    return ticketModel;
}
function newTicket(data) {
    let _ticketModel = getModel();
    return new _ticketModel(data);
}
//# sourceMappingURL=Tickets.js.map