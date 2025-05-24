import mongoose = require('mongoose');

export interface Airports extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId,
    code: string,
    city: string,
    state: string,
    position: [number, number],

    getCode: () => string,
    getCity: () => string,
    getState: () => string,
    getPosition: () => [number, number],

    setCode: (code: string) => void,
    setCity: (city: string) => void,
    setState: (state: string) => void,
    setPosition: (position: [number, number]) => void
}

//Defining Schema
const airportSchema = new mongoose.Schema<Airports>({
    code: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    city: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    state: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    position: {
        type: [mongoose.SchemaTypes.Number, mongoose.SchemaTypes.Number],
        required: true,
        unique: true
    }
})

//Defining Functions
airportSchema.methods.getCode = function (){
    return this.code;
}
airportSchema.methods.getCity = function (){
    return this.city;
}
airportSchema.methods.getState = function (){
    return this.state;
}
airportSchema.methods.getPosition = function (){
    return this.position;
}

airportSchema.methods.setCode = function (code: string){
    this.code = code;
}
airportSchema.methods.setCity = function (city: string){
    this.city = city;
}
airportSchema.methods.setState = function (state: string){
    this.state = state;
}
airportSchema.methods.setPosition = function (position: [number, number]) {
    this.position = position;
}

export function getSchema() { return airportSchema; }

// Mongoose Model
let airportModel;  // This is not exposed outside the model
export function getModel() : mongoose.Model<Airports>  { // Return Model as singleton
    if( !airportModel) {
        airportModel = mongoose.model('Airport', getSchema() )
    }
    return airportModel;
}

export function newAirport( data ): Airports {
    let _airportModel = getModel();
    return new _airportModel(data);
}