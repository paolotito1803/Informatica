import mongoose = require('mongoose')

export interface Routes extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId,
    destination: string,
    depart: string,
    length: number,
    layoverFuel: number,
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
        required: false
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
    if(!this.length){
        this.length = Math.abs(Math.sqrt((this.layoverFuel.position[0] - this.depart.position[0])^2 + (this.layoverFuel.position[1] - this.depart.position[1])^2)
            + Math.sqrt((this.destination.position[0] - this.layoverFuel.position[0])^2 + (this.destination.position[1] - this.layoverFuel.position[1])^2));
        return this.length
    }
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
    let route = new _routemodel( data );

    return route;
}