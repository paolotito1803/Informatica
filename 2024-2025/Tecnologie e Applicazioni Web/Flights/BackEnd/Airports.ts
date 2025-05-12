import mongoose = require('mongoose')

export interface Airports extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId,
    code: string,
    city: string,
    state: string,
    position: [number, number],
    getCode: () => string,
    getCity: () => string,
    getState: () => string,
    getNumber: () => [number, number],
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