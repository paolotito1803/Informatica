import mongoose = require('mongoose')
import {Users} from "./Users";

export interface Routes extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId,
    destination: String,
    depart: String,
    length: Number,
    layoverFuel: Number,
    setDestination: (dst:string) => void,
    setDepartment: (dep:string) => void,
    setLength: (len:number) => void,
    setLayoverFuel: (lf:number) => void,
    getDestination: () => string,
    getDepartment: () => string,
    getLength: () => number,
    getLayoverFuel: () => number
}

//Defining the schema
const routeSchema = new mongoose.Schema<Routes>({
    destination: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    depart: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    length: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    layoverFuel: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
})

//Defining functions
routeSchema.methods.setDestination = function(dst:string){
    this.destination = dst;
}

routeSchema.methods.setDepartment = function(dep:string){
    this.depart = dep;
}

routeSchema.methods.setLength = function(len:number){
    this.length = len;
}

routeSchema.methods.setLayoverFuel = function(lp:string){
    this.layoverFuel = lp;
}

routeSchema.methods.getDestination = function(){
    return this.destination;
}

routeSchema.methods.getDepartment = function(){
    return this.depart;
}

routeSchema.methods.getLength = function(){
    return this.length;
}

routeSchema.methods.getLayoverFuel = function(){
    return this.layoverFuel;
}