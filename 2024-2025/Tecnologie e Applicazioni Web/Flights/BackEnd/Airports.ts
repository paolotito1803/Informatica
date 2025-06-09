import mongoose = require('mongoose');

export interface Airports extends mongoose.Document{
    readonly _code : string,
    name: string,
    city : string,

    getName: () => string,
    getCity: () => string,
    setName: (name: string) => void,
    setCity: (city : string) => void
}

const airportSchema = new mongoose.Schema<Airports>({
    _code : {
        type : mongoose.SchemaTypes.String,
        required : true,
        unique : true
    },
    name : {
        type : mongoose.SchemaTypes.String,
        required : true,
    },
    city : {
        type : mongoose.SchemaTypes.String,
        required : true
    }
});

airportSchema.methods.getName = function() : string {
    return this.name;
}

airportSchema.methods.getCity = function() : string {
    return this.city;
}

airportSchema.methods.setName = function(name : string){
    this.name = name;
}

airportSchema.methods.setCity = function(city : string){
    this.city = city;
}

export function getSchema() { return airportSchema; }

// Mongoose Model
let airportModel: any;  // This is not exposed outside the model
export function getModel() : mongoose.Model<Airports>  { // Return Model as singleton
    if( !airportModel ) {
        airportModel = mongoose.model('Airports', getSchema() )
    }
    return airportModel;
}

export function newAirport( data ): Airports {
    let _airportModel = getModel();
    return new _airportModel(data);
}