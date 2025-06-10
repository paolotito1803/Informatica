"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newAirline = newAirline;
const mongoose = require("mongoose");
const airlineSchema = new mongoose.Schema({
    _signature: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    revenue: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    /*tickets : {
        type: Array.of<Tickets>()
    },*/
    aircrafts: {
        type: Array.of()
    },
    duration: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
});
airlineSchema.methods.getName = function () {
    return this.name;
};
airlineSchema.methods.getRevenue = function () {
    return this.revenue;
};
/*airlineSchema.methods.getTickets = function() : Tickets[] {
    return this.tickets;
}*/
airlineSchema.methods.getAircrafts = function () {
    return this.aircrafts;
};
airlineSchema.methods.getDuration = function () {
    return this.duration;
};
airlineSchema.methods.setName = function (name) {
    this.name = name;
};
airlineSchema.methods.setRevenue = function (revenue) {
    this.revenue = revenue;
};
/*airlineSchema.methods.setTickets = function(tickets : Tickets[]){
    this.tickets = tickets;
}*/
airlineSchema.methods.setAircrafts = function (aircrafts) {
    this.aircrafts = aircrafts;
};
airlineSchema.methods.setDuration = function (duration) {
    return this.duration;
};
function getSchema() { return airlineSchema; }
let airlineModel;
function getModel() {
    if (!airlineModel) {
        airlineModel = mongoose.model('Airlines', getSchema());
    }
    return airlineModel;
}
function newAirline(data) {
    let _airlineModel = getModel();
    return new _airlineModel(data);
}
//# sourceMappingURL=Airlines.js.map