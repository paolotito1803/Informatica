import mongoose = require("mongoose");

export interface Flights extends mongoose.Document{
    readonly _flightCode : string,
    dataOra : Date,
    route : mongoose.Schema.Types.ObjectId,
    aircraft : mongoose.Schema.Types.String,
    duration : number,

    getDateOra : () => Date,
    getRoute : () => mongoose.Schema.Types.ObjectId,
    getAircraft : () => mongoose.Schema.Types.String,
    getDuration : () => number,
    setDataOra : (data : Date) => void,
    setRoute: (code : mongoose.Schema.Types.ObjectId) => void,
    setAircraft: (code : mongoose.Schema.Types.String) => void
    setDuration: (duration : number) => void
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
    },
    duration : {
        type: mongoose.Schema.Types.Number,
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

flightSchema.methods.getDuration = function() : number {
    return this.duration;
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

flightSchema.methods.setDuration = function(duration : number) : void {
    this.duration = duration;
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
    if(typeof data.dataOra === "string")
        data.dataOra = new Date(data.dataOra);
    return new _flightModel(data);
}