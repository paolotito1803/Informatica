import mongoose = require('mongoose');
import {Airports} from "./Airports"

export interface Routes extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId,
    destination: Airports,
    depart: Airports,
    length: number,
    layoverFuel: Airports,

    setDestination: (dst:Airports) => void,
    setDepartment: (dep:Airports) => void,
    setLayoverFuel: (lf:Airports) => void,

    getDestination: () => Airports,
    getDepart: () => Airports,
    getLength: () => number,
    getLayoverFuel: () => Airports
}

//Defining the schema
const routeSchema = new mongoose.Schema<Routes>({
    destination: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Airports",
        required: true
    },
    depart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Airports",
        required: true
    },
    length: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    layoverFuel: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Airports",
        required: false
    }
})

//Defining functions
routeSchema.methods.setDestination = function(dst:Airports){
    this.destination = dst;
}

routeSchema.methods.setDepartment = function(dep:Airports){
    this.depart = dep;
}

routeSchema.methods.setLayoverFuel = function(lp:Airports){
    this.layoverFuel = lp;
}

routeSchema.methods.getDestination = function(){
    return this.destination;
}

routeSchema.methods.getDepartment = function(){
    return this.depart;
}

routeSchema.methods.getLength = function(){
    if(!this.length){
        this.length = Math.abs(
            Math.sqrt(
                (this.layoverFuel.position[0] - this.depart.position[0])^2 +
                (this.layoverFuel.position[1] - this.depart.position[1])^2)
            +
            Math.sqrt(
                (this.destination.position[0] - this.layoverFuel.position[0])^2 +
                (this.destination.position[1] - this.layoverFuel.position[1])^2)
        );
    }
    return this.length;
}

routeSchema.methods.getLayoverFuel = function(){
    return this.layoverFuel;
}

export function getSchema() { return routeSchema; }

// Mongoose Model
let routeModel;  // This is not exposed outside the model
export function getModel() : mongoose.Model< Routes>  { // Return Model as singleton
    if( !routeModel ) {
        routeModel = mongoose.model('Route', getSchema() )
    }
    return routeModel;
}

export function newRoute( data ): Routes {
    let _routemodel = getModel();
    return new _routemodel(data);
}