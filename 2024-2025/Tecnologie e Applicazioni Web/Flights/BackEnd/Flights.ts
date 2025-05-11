import mongoose = require('mongoose')
import {Airlines} from "./Airlines";
import {Aircrafts} from "./Aircrafts";
import {Routes} from "./Routes";
import {Tickets} from './Tickets'

export interface Flights extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId,
    airline: Airlines[],
    aircraft: Aircrafts[],
    route: Routes[],
    ticket: Tickets[],
    getAirline: () => Array<Airlines>,
    getAircraft: () => Array<Aircrafts>,
    getTicket: () => Array<Tickets>,
    getRoute: () => Array<Routes>,
    setAirline: (airline: Array<Airlines>) => void,
    setAircraft: (aircraft: Array<Aircrafts>) => void,
    setTickets: (ticket: Array<Tickets>) => void,
    setRoutes: (route: Array<Routes>) => void
}

//Defining Schema
const flightSchema = new mongoose.Schema<Flights>({
    airline: {
        type: Array<Airlines>(),
        required: true
    },
    aircraft: {
        type: Array<Aircrafts>(),
        required: true
    },
    route: {
        type: Array<Routes>(),
        required: true
    },
    ticket: {
        type: Array<Tickets>(),
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

flightSchema.methods.setAirline = function(airline: Array<Airlines>): void {
    this.airline = airline;
}

flightSchema.methods.setAircraft = function(aircraft: Array<Aircrafts>): void {
    this.aircraft = aircraft;
}

flightSchema.methods.setTicket = function(tickets: Array<Tickets>): void {
    this.ticket = tickets;
}

flightSchema.methods.setRoutes = function(routes: Array<Routes>): void {
    this.route = routes;
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