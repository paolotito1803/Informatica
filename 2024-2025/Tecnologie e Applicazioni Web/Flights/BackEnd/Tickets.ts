import mongoose = require("mongoose");
import { Users } from "./Users";

export interface Tickets extends mongoose.Document{
    readonly _code : string,
    user : mongoose.Schema.Types.ObjectId,
    seat : mongoose.Schema.Types.String, // oppure string
    //airline : mongoose.Schema.Types.String, // oppure string
    flight : mongoose.Schema.Types.String, // oppure string
    price : number,
    numBag : number,

    getUser: () => mongoose.Schema.Types.ObjectId,
    getSeat: () => mongoose.Schema.Types.String,
    //getAirline: () => mongoose.Schema.Types.String,
    getFlight : () => mongoose.Schema.Types.String,
    getPrice: () => number,
    getNumBag : () => number,
    setUser: (user: mongoose.Schema.Types.ObjectId) => void
    setSeat: (seat : mongoose.Schema.Types.String) => void,
    //setAirline: (airline : mongoose.Schema.Types.String) => void,
    setFlight : (flight : mongoose.Schema.Types.String) => void,
    setPrice: (price : number) => void,
    setNumBag: (numBag: number) => void
}

const ticketSchema = new mongoose.Schema<Tickets>({
    _code : {
        type : mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required: true
    },
    seat: {
        type : mongoose.Schema.Types.String,
        ref : "Seats",
        required: true
    },
    /*airline: {
        type : mongoose.Schema.Types.String,
        ref : "Airlines",
        required: true
    },*/
    flight : {
        type : mongoose.Schema.Types.String,
        ref : "Flights",
        required: true
    },
    price : {
        type: mongoose.Schema.Types.Number,
        required : true
    },
    numBag : {
        type : mongoose.Schema.Types.Number,
        required : true
    }
})

ticketSchema.methods.getUser = function() : mongoose.Schema.Types.ObjectId{
    return this.user;
}

ticketSchema.methods.getSeat = function() : mongoose.Schema.Types.ObjectId{
    return this.seat;
}

/*ticketSchema.methods.getAirline = function() : mongoose.Schema.Types.ObjectId{
    return this.airline;
}*/

ticketSchema.methods.getFlight = function() : mongoose.Schema.Types.ObjectId{
    return this.flight;
}

ticketSchema.methods.getPrice = function() : number{
    return this.price;
}

ticketSchema.methods.getNumBag = function() : number {
    return this.numBag;
} 

ticketSchema.methods.setUser = function(user : mongoose.Schema.Types.ObjectId){
    this.user = user;
}

ticketSchema.methods.setSeat = function(seat : mongoose.Schema.Types.String){
    this.seat = seat;
}

/*ticketSchema.methods.setAirline = function(airline : mongoose.Schema.Types.String){
    this.airline = airline;
}*/

ticketSchema.methods.setFlight = function(flight : mongoose.Schema.Types.String){
    this.flight = flight;
}

ticketSchema.methods.setPrice = function(price : number){
    this.price = price;
}

ticketSchema.methods.setNumBag = function(numBag : number) : void {
    this.numBag = numBag;
}

export function getSchema() { return ticketSchema; }

// Mongoose Model
let ticketModel: any;  // This is not exposed outside the model
export function getModel() : mongoose.Model<Tickets>  { // Return Model as singleton
    if( !ticketModel ) {
        ticketModel = mongoose.model('Tickets', getSchema() )
    }
    return ticketModel;
}

export function newTicket( data ): Tickets {
    let _ticketModel = getModel();
    return new _ticketModel(data);
}