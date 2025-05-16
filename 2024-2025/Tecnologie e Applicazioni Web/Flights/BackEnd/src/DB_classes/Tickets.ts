import mongoose = require('mongoose')
import {Users} from './Users';
import {Flights} from './Flights';
import {Seats} from "./Seats";

export interface Tickets extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId,
    user: Users,
    seat: Seats,
    flight: Flights,
    numCabinBag: number,
    numCheckedLuggages: number,
    price: number,
    getUser: () => Users,
    getFlight: () => Flights,
    getSeat: () => Seats,
    getNumCabinBag: () => number,
    getNumCheckedLuggages: () => number,
    getPrice: () => number
    setUser: (user: Users) => void,
    setFlight: (flight: Flights) => void,
    setSeat: (seat: Seats) => void,
    setNumCabinBag: (numCabinBag: number) => void,
    setNumCheckedLuggages: (numCheckedLuggages: number) => void,
    setPrice: (price: number) => void
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

ticketSchema.methods.setNumCabinBag = function(numCabinBag: number){
    this.numCabinBag = numCabinBag;
}

ticketSchema.methods.setNumCheckedLuggages = function(numCheckedLuggages: number){
    this.numCheckedLuggages = numCheckedLuggages;
}

ticketSchema.methods.setPrice = function(price: number){
    this.price = price;
}

export function getSchema() { return ticketSchema; }

// Mongoose Model
let ticketModel;  // This is not exposed outside the model
export function getModel() : mongoose.Model<Tickets>  { // Return Model as singleton
    if( !ticketModel ) {
        ticketModel = mongoose.model('Ticket', getSchema() )
    }
    return ticketModel;
}

export function newSeat( data ): Tickets {
    let _seatModel = getModel();
    let tickets = new _seatModel( data );
    return tickets;
}