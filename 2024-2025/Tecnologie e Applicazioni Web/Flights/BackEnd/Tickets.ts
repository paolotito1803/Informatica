import mongoose = require('mongoose')
import {Users} from './Users';
import {Flights} from './Flights';
import {Seats} from "./Seats";
import {Double} from "mongoose";

export interface Tickets extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId,
    user: Users,
    seat: Seats,
    flight: Flights,
    numCabinBag: Number,
    numCheckedLuggages: Number,
    price: Double,
    getUser: () => Users,
    getFlight: () => Flights,
    getSeat: () => Seats,
    getNumCabinBag: () => Number,
    getNumCheckedLuggages: () => Number,
    getPrice: () => Double
    setUser: (user: Users) => void,
    setFlight: (flight: Flights) => void,
    setSeat: (seat: Seats) => void,
    setNumCabinBag: (numCabinBag: Number) => void,
    setNumCheckedLuggages: (numCheckedLuggages: Number) => void,
    setPrice: (price: Double) => void
}

//Defining Schema
const ticketSchema = new mongoose.Schema<Tickets>({
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
        type: Number,
        required: true
    },
    numCheckedLuggages: {
        type: Number,
        required: true
    }
})

//Defining Functions
ticketSchema.methods.getUser = function(){
    return this.user;
}

ticketSchema.methods.getFlight = function(){
    return this.flight;
}

ticketSchema.methods.getSeat = function(){
    return this.seat;
}

ticketSchema.methods.getNumCabinBag = function(){
    return this.numCabinBag;
}

ticketSchema.methods.getNumCheckedLuggages = function(){
    return this.numCheckedLuggages;
}

ticketSchema.methods.getPrice = function(){
    return this.price;
}

ticketSchema.methods.setUser = function(user: Users){
    this.user = user;
}

ticketSchema.methods.setFlight = function(flight: Flights){
    this.flight = flight;
}

ticketSchema.methods.setSeat = function(seat: Seats){
    this.seat = seat;
}

ticketSchema.methods.setNumCabinBag = function(numCabinBag: Number){
    this.numCabinBag = numCabinBag;
}

ticketSchema.methods.setNumCheckedLuggages = function(numCheckedLuggages: Number){
    this.numCheckedLuggages = numCheckedLuggages;
}

ticketSchema.methods.setPrice = function(price: Double){
    this.price = price;
}