"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
exports.getModel = getModel;
exports.newUser = newUser;
const mongoose = require("mongoose");
const crypto = require("crypto");
//Definig the schema
const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    passportID: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    mail: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    roles: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    salt: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    digest: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    tickets: {
        type: Array.of()
    }
});
//Defining functions
userSchema.methods.setPassword = function (pwd) {
    this.salt = crypto.randomBytes(16).toString('hex');
    const hmac = crypto.createHmac('sha512', this.salt);
    hmac.update(pwd);
    this.digest = hmac.digest('hex');
};
userSchema.methods.validatePassword = function (pwd) {
    const hmac = crypto.createHmac('sha512', this.salt);
    hmac.update(pwd);
    const digest = hmac.digest('hex');
    return (this.digest === digest);
};
userSchema.methods.hasAdminRole = function () {
    if (this.roles === "admin")
        return true;
    return false;
};
userSchema.methods.hasAirlineRole = function () {
    if (this.roles === "airline")
        return true;
    return false;
};
userSchema.methods.hasPassangerRole = function () {
    if (this.roles === "passenger")
        return true;
    return false;
};
userSchema.methods.setRole = function (role) {
    if (role != "admin" && role != "airline" && role != "passenger")
        console.error("Inexistent role.");
    else
        this.roles = role;
};
userSchema.methods.getTickets = function () {
    return this.tickets;
};
userSchema.methods.setTickets = function (tickets) {
    this.tickets = tickets;
};
userSchema.methods.addTicket = function (ticket) {
    this.tickets.push(ticket);
};
function getSchema() { return userSchema; }
// Mongoose Model
let userModel; // This is not exposed outside the model
function getModel() {
    if (!userModel) {
        userModel = mongoose.model('Users', getSchema());
    }
    return userModel;
}
function newUser(data) {
    let _usermodel = getModel();
    return new _usermodel(data);
}
//# sourceMappingURL=Users.js.map