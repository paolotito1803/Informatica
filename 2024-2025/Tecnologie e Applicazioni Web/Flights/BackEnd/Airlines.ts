import mongoose = require("mongoose");
import { Users } from "./Users"
import { Tickets } from "./Tickets";
import { Aircrafts } from "./Aircrafts"

export interface Airlines extends Users{
    readonly _signature : string,
    name: string,
    revenue : number,
    //tickets : Tickets[],
    aircrafts : Aircrafts[],
    duration : number,

    getName: () => string,
    getRevenue: () => number,
    //getTickets: () => Tickets[],
    getAircrafts: () => Aircrafts[],
    getDurationo : () => number,
    setName: (name: string) => void,
    setRevenue: (revenue : number) => void,
    //setTickets: (tickets : Tickets[]) => void,
    setAircrafts: (aircrafts : Aircrafts[]) => void,
    setDuration : (duration : number) => void
}

const airlineSchema = new mongoose.Schema<Airlines>({
    _signature : {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique : true
    },
    name : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    revenue : {
        type : mongoose.SchemaTypes.Number,
        default : 0
    },
    /*tickets : {
        type: Array.of<Tickets>()
    },*/
    aircrafts : {
        type : Array.of<Aircrafts>()
    },
    duration : {
        type : mongoose.Schema.Types.Number,
        required : true
    }
});

airlineSchema.methods.getName = function() : string {
    return this.name;
}

airlineSchema.methods.getRevenue = function() : number {
    return this.revenue;
}

/*airlineSchema.methods.getTickets = function() : Tickets[] {
    return this.tickets;
}*/

airlineSchema.methods.getAircrafts = function() : Aircrafts[] {
    return this.aircrafts;
}

airlineSchema.methods.getDuration = function() : number {
    return this.duration;
}

airlineSchema.methods.setName = function(name : string){
    this.name = name;
}
airlineSchema.methods.setRevenue = function(revenue : number){
    this.revenue = revenue;
}

/*airlineSchema.methods.setTickets = function(tickets : Tickets[]){
    this.tickets = tickets;
}*/

airlineSchema.methods.setAircrafts = function(aircrafts : Aircrafts[]){
    this.aircrafts = aircrafts;
}

airlineSchema.methods.setDuration = function(duration : number) : void {
    return this.duration;
}

export function getSchema() {return airlineSchema;}

let airlineModel : any;
export function getModel() : mongoose.Model<Airlines> {
    if(!airlineModel) {
        airlineModel = mongoose.model('Airlines', getSchema());
    }
    return airlineModel;
}

export function newAirline(data) : Airlines {
    let _airlineModel = getModel();
    return new _airlineModel(data);
}