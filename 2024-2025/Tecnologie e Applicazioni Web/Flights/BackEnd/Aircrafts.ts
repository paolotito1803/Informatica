import mongoose = require("mongoose");
import { Seats } from "./Seats";

export interface Aircrafts extends mongoose.Document{
    readonly _numAircraft : string,
    seats : Seats[],
    modello : string,

    getSeats : () => Seats[],
    getModello : () => string,
    setSeats : (seats : Seats[]) => void,
    setModello : (modello : string)  => void
}

const aircraftSchema = new mongoose.Schema<Aircrafts>({
    _numAircraft : {
        type: mongoose.SchemaTypes.String,
        required : true,
        unique : true
    },
    seats : {
        type: Array.of<Seats>(),
        required : true
    },
    modello : {
        type: mongoose.SchemaTypes.String,
        required : true
    }
})

aircraftSchema.methods.getSeats = function() : Seats[] {
    return this.seats;
}

aircraftSchema.methods.getModello = function() : string {
    return this.modello;
}

aircraftSchema.methods.setSeats = function(seats : Seats[]){
    this.seats = seats;
}

aircraftSchema.methods.setModello = function(modello : string) {
    this,modello = modello;
}

export function getSchema() {return aircraftSchema;}

let aircraftModel : any;
export function getModel() : mongoose.Model<Aircrafts> {
    if(!aircraftModel) {
        aircraftModel = mongoose.model('Aircrafts', getSchema());
    }
    return aircraftModel;
}

export function newAircraft(data) : Aircrafts {
    let _aircraftModel = getModel();
    return new _aircraftModel(data);
}