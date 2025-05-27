import mongoose = require('mongoose');
import {Seats} from './Seats'

export interface Aircrafts extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId,
    aircraftID: string
    aircraftModel: string,
    seat: Array<Seats>,
    getaircraftModel: () => string,
    getSeat: () => Array<Seats>,
    setaircraftModel: (aircraftModel: string) => void,
    setSeat: (seat: Array<Seats>) => void
}

//Defining Schema
const aircraftSchema = new mongoose.Schema<Aircrafts>({
    aircraftID:{
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    aircraftModel: {
        type: mongoose.SchemaTypes.String,
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
aircraftSchema.methods.getaircraftModel = function(){
    return this.aircraftModel;
}

aircraftSchema.methods.getSeat = function(){
    return this.seat;
}

aircraftSchema.methods.setaircraftModel = function(aircraftModel: string){
    this.aircraftModel = aircraftModel;
}

aircraftSchema.methods.setSeat = function(seat: Array<Seats>){
    this.seat = seat;
}

export function getSchema() { return aircraftSchema; }

// Mongoose Model
let aircraftModel;  // This is not exposed outside the model
export function getModel() : mongoose.Model<Aircrafts> { // Return Model as singleton
    if( !aircraftModel ) {
        aircraftModel = mongoose.model('Aircraft', getSchema() )
    }
    return aircraftModel;
}

export function newAircraft( data ): Aircrafts {
    let _aircraftModel = getModel();
    return new _aircraftModel(data);
}