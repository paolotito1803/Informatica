import mongoose = require("mongoose");

export interface Flights extends mongoose.Document{
    readonly _flightCode : string,
    dataOra : Date,
    route : mongoose.Schema.Types.ObjectId,
    aircraft : mongoose.Schema.Types.String,

    getDateOra : () => Date,
    getRoute : () => mongoose.Schema.Types.ObjectId,
    getAircraft : () => mongoose.Schema.Types.String,
    setDataOra : (data : Date) => void,
    setRoute: (code : mongoose.Schema.Types.ObjectId) => void,
    setAircraft: (code : mongoose.Schema.Types.String) => void
}

const flightSchema = new mongoose.Schema<Flights>({
    _flightCode : {
        type: mongoose.SchemaTypes.String,
        required : true,
        unique : true
    },
    dataOra : {
        type: mongoose.SchemaTypes.Date,
        required : true
    },
    route : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Routes",
        required : true
    },
    aircraft : {
        type : mongoose.Schema.Types.String,
        ref : "Aircrafts",
        required : true
    }
})

flightSchema.methods.getDateOra = function() : Date {
    return this.dataOra;
}

flightSchema.methods.getRoute = function() : mongoose.Schema.Types.ObjectId {
    return this.route;
}

flightSchema.methods.getAircraft = function() : mongoose.Schema.Types.String {
    return this.aircraft;
}

flightSchema.methods.setOraData = function(data : Date) : void {
    this.dataOra = data;
}

flightSchema.methods.setRoute = function(route : mongoose.Schema.Types.ObjectId) : void {
    this.route = route;
}

flightSchema.methods.setAircraft = function(code : mongoose.Schema.Types.String) : void {
    this.aircraft = code;
}

export function getSchema() {return flightSchema;}

let flightModel : any;
export function getModel() : mongoose.Model<Flights> {
    if(!flightModel) {
        flightModel = mongoose.model('Flights', getSchema());
    }
    return flightModel;
}

export function newFlight(data) : Flights {
    let _flightModel = getModel();
    return new _flightModel(data);
}