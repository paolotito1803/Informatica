import mongoose = require("mongoose");
import crypto = require("crypto");
import { Users } from "./Users"
import { Tickets } from "./Tickets";
import { Aircrafts } from "./Aircrafts"

export interface Airlines extends mongoose.Document{
    readonly _signature : string,
    name: string,
    revenue : number,
    mail : string,
    //tickets : Tickets[],
    aircrafts : Aircrafts[],
    mustChangePassword: boolean,
    salt : string,
    digest : string,

    getName: () => string,
    getRevenue: () => number,
    //getTickets: () => Tickets[],
    getAircrafts: () => Aircrafts[],
    setName: (name: string) => void,
    setRevenue: (revenue : number) => void,
    //setTickets: (tickets : Tickets[]) => void,
    setAircrafts: (aircrafts : Aircrafts[]) => void,
    setAirlinePassword: (pwd:string)=>void,
    validateAirlinePassword: (pwd:string)=>boolean,
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
    mail : {
        type : mongoose.SchemaTypes.String,
        ref : "Users",
        required: true
    },
    salt : {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    digest : {
        type: mongoose.SchemaTypes.String,
        required : false
    },
    mustChangePassword : {
        type : mongoose.SchemaTypes.Boolean,
        default : true
    },
    aircrafts : {
        type : Array.of<Aircrafts>()
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

airlineSchema.methods.setAirlinePassword = function(pwd:string){
    this.salt = crypto.randomBytes(16).toString('hex');
    const hmac = crypto.createHmac('sha512', this.salt );
    hmac.update( pwd );
    this.digest = hmac.digest('hex');
}

airlineSchema.methods.validateAirlinePassword = function( pwd:string ):boolean {
    const hmac = crypto.createHmac('sha512', this.salt );
    hmac.update(pwd);
    const digest = hmac.digest('hex');
    return (this.digest === digest);
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