import mongoose = require('mongoose')
import {Routes} from './Routes'
import {Aircrafts} from './Aircrafts'
import {Flights} from './Flights'

export interface Airlines extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId,
    name: String,
    aircrafts: Aircrafts[],
    flights: Flights[],
    routes: Routes[],
    revenue: Number,
    getName: () => string,
    getRevenue: () => Number,
    getFlight: () => Array<Flights>,
    getAircraft: () => Array<Aircrafts>
    getRoute: () => Array<Routes>,
    setName: (name: string) => void,
    setRevenue: (revenue: number) => void,
    setFlight: (flights: Array<Flights>) => void,
    setAircraft: (aircrafts: Array<Aircrafts>) => void,
    setRoute: (routes: Array<Routes>) => void
}

//Defining schema
const airlineSchema = new mongoose.Schema<Airlines>({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    aircrafts: {
        type: Array.of<Aircrafts>(),
        required: true
    },
    flights: {
        type: Array.of<Flights>(),
        required: true
    },
    routes: {
        type: Array.of<Routes>(),
        required: true
    },
    revenue: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
})

//Defining functions
airlineSchema.methods.getName = function(){
    return this.name;
}

airlineSchema.methods.getRevenue = function(){
    return this.revenue;
}

airlineSchema.methods.getAircraft = function(){
    return this.aircrafts;
}

airlineSchema.methods.getRoute = function(){
    return this.routes;
}

airlineSchema.methods.getFlight = function(){
    return this.flights;
}

airlineSchema.methods.setName = function(name: string){
    this.name = name;
}

airlineSchema.methods.setRevenue = function(revenue: number){
    this.revenue = revenue;
}

airlineSchema.methods.setAircraft = function(aircrafts: Array<Aircrafts>){
    this.aircrafts = aircrafts;
}

airlineSchema.methods.setRoute = function(routes: Array<Routes>){
    this.routes = routes;
}

airlineSchema.methods.setFlight = function(flights: Array<Flights>){
    this.flights = flights;
}

export function getSchema() { return airlineSchema; }

// Mongoose Model
let airlineModel;  // This is not exposed outside the model
export function getModel() : mongoose.Model< Airlines>  { // Return Model as singleton
    if( !airlineModel ) {
        airlineModel = mongoose.model('Airline', getSchema() )
    }
    return airlineModel;
}

export function newAirline( data ): Airlines {
    let _airlineModel = getModel();
    let airLine = new _airlineModel( data );
    return airLine;
}