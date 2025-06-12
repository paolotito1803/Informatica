"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newAirline = newAirline;
const mongoose = require("mongoose");
const crypto = require("crypto");
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
    mail: {
        type: mongoose.SchemaTypes.String,
        ref: "Users",
        required: true
    },
    salt: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    digest: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    mustChangePassword: {
        type: mongoose.SchemaTypes.Boolean,
        default: true
    },
    aircrafts: {
        type: Array.of()
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
airlineSchema.methods.setAirlinePassword = function (pwd) {
    this.salt = crypto.randomBytes(16).toString('hex');
    const hmac = crypto.createHmac('sha512', this.salt);
    hmac.update(pwd);
    this.digest = hmac.digest('hex');
};
airlineSchema.methods.validateAirlinePassword = function (pwd) {
    const hmac = crypto.createHmac('sha512', this.salt);
    hmac.update(pwd);
    const digest = hmac.digest('hex');
    return (this.digest === digest);
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