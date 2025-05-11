import mongoose = require('mongoose')
import {Seats} from './Seats'

export interface Aircrafts extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId,
    modell: string,
    seat: Array<Seats>,
    getModell: () => string,
    getSeat: () => Array<Seats>,
    setModell: (modell: string) => void,
    setSeat: (seat: Array<Seats>) => void
}

//Defining Schema
const aircraftSchema = new mongoose.Schema<Aircrafts>({
    modell: {
        type: String,
        required: true,
        unique: true
    },
    seat: {
        type: Array<Seats>(),
        required: true,
        unique: true
    }
})

//Defining Functions
aircraftSchema.methods.getModell = function(){
    return this.modell;
}

aircraftSchema.methods.getSeat = function(){
    return this.seat;
}

aircraftSchema.methods.setModell = function(modell: string){
    this.modell = modell;
}

aircraftSchema.methods.setSeat = function(seat: Array<Seats>){
    this.seat = seat;
}

export function getSchema() { return aircraftSchema; }

// Mongoose Model
let aircraftModel;  // This is not exposed outside the model
export function getModel() : mongoose.Model< Aircrafts>  { // Return Model as singleton
    if( !aircraftSchema ) {
        aircraftModel = mongoose.model('Aircraft', getSchema() )
    }
    return aircraftModel;
}

export function newAircraft( data ): Aircrafts {
    let _aircraftModel = getModel();
    let aircraft = new _aircraftModel( data );
    return aircraft;
}