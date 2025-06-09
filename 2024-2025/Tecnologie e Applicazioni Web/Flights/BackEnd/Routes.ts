import mongoose = require('mongoose');

export interface Routes extends mongoose.Document{
    readonly _id : mongoose.Schema.Types.ObjectId,
    destination : mongoose.Schema.Types.String,
    departure : mongoose.Schema.Types.String,
    layoverFuel: String[],

    getDestination: () => mongoose.Schema.Types.String,
    setDestination: (dest: mongoose.Schema.Types.String) => void,
    getDeparture: () => mongoose.Schema.Types.String,
    setDeparture: (depart: mongoose.Schema.Types.String) => void,
    getLayoverFuel : () => string[],
    setLayoverFuel : (layoverFuel : string[]) => void
}

const routeSchema = new mongoose.Schema<Routes>({
    destination : {
        type: mongoose.Schema.Types.String,
        ref : "Airports",
        required : true
    },
    departure : {
        type: mongoose.Schema.Types.String,
        ref : "Airports",
        required : true
    },
    layoverFuel : {
        type : Array.of<string>()
    }
});

routeSchema.methods.getDestination = function() : mongoose.Schema.Types.String{
    return this.destination;
}

routeSchema.methods.setDestination = function(dest: mongoose.Schema.Types.String){
    this.destination = dest;
}

routeSchema.methods.getDeparture = function() : mongoose.Schema.Types.String{
    return this.departure;
}

routeSchema.methods.setDeparture = function(depart: mongoose.Schema.Types.String){
    this.departure = depart;
}

routeSchema.methods.getLayoverFuel = function() : string[] {
    return this.layoverFuel;
}

routeSchema.methods.setLayoverFuel = function(layoverFuel : string[]) : void {
    this.layoverFuel = layoverFuel;
}

export function getSchema() { return routeSchema; }

// Mongoose Model
let routeModel: any;  // This is not exposed outside the model
export function getModel() : mongoose.Model<Routes>  { // Return Model as singleton
    if( !routeModel ) {
        routeModel = mongoose.model('Route', getSchema() )
    }
    return routeModel;
}

export function newRoute( data ): Routes {
    let _routeModel = getModel();
    return new _routeModel(data);
}