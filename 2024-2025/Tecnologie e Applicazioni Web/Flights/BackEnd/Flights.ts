import mongoose = require('mongoose')
import {Airlines} from "./Airlines";
import {Aircrafts} from "./Aircrafts";
import {Routes} from "./Routes";
import {Tickets} from './Tickets'

export interface Flights extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId,
    flightCode: string,
    airline: Airlines[],
    aircraft: Aircrafts[],
    route: Routes,
    tickets: Tickets[],
    departTime: Date,
    getAirline: () => Array<Airlines>,
    getAircraft: () => Array<Aircrafts>,
    getTicket: () => Array<Tickets>,
    getRoute: () => Routes,
    getDepartTime: () => Date,
    setAirline: (airline: Array<Airlines>) => void,
    setAircraft: (aircraft: Array<Aircrafts>) => void,
    setTickets: (ticket: Array<Tickets>) => void,
    setRoutes: (route: Routes) => void,
    setDepartTime: (departTime: Date) => void
}

//Defining Schema
const flightSchema = new mongoose.Schema<Flights>({
    flightCode: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    airline: {
        type: Array<Airlines>(),
        required: true
    },
    aircraft: {
        type: Array<Aircrafts>(),
        required: true
    },
    route: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Routes",
        required: true
    },
    tickets: {
        type: Array<Tickets>(),
        required: true
    },
    departTime: {
        type: Date,
        required: true
    }
})

//Defining Functions
flightSchema.methods.getAirline = function() {
    return this.airline;
}

flightSchema.methods.getAircraft = function() {
    return this.aircraft;
}

flightSchema.methods.getTickets = function() {
    return this.ticket;
}

flightSchema.methods.getRoute = function() {
    return this.route;
}

flightSchema.methods.getDepartTime = function() {
    return this.departTime;
}

flightSchema.methods.setAirline = function(airline: Array<Airlines>): void {
    this.airline = airline;
}

flightSchema.methods.setAircraft = function(aircraft: Array<Aircrafts>): void {
    this.aircraft = aircraft;
}

flightSchema.methods.setTickets = function(tickets: Array<Tickets>): void {
    this.tickets = tickets;
}

flightSchema.methods.setRoutes = function(routes: Routes): void {
    this.route = routes;
}

flightSchema.methods.setDepartTime = function(departTime: Date): void {
    this.departTime = departTime;
}

export function getSchema() { return flightSchema; }

// Mongoose Model
let flightModel;  // This is not exposed outside the model
export function getModel() : mongoose.Model<Flights>  { // Return Model as singleton
    if( !flightModel ) {
        flightModel = mongoose.model('Flight', getSchema() )
    }
    return flightModel;
}

export function newFlight( data ): Flights {
    let _flightModel = getModel();
    let flight = new _flightModel( data );
    return flight;
}