import mongoose = require('mongoose');

export interface Seats extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId,
   numberSeat: string,
    classes: string,
    legroom: boolean,
    isFree: boolean,

    getNumberSeat: () => string,
    getClasses: () => string,
    getLegroom: () => boolean,
    isFreeSeat: () => boolean,

    setNumberSeat: (numberSeat: string) => void,
    setClasses: (classes: string) => void,
    setLegroom: (legroom: boolean) => void,
    setSeat: (isFree: boolean) => void,
}

//Defining Schema
const seatSchema = new mongoose.Schema<Seats>({
    numberSeat: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    classes: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    legroom: {
        type: mongoose.SchemaTypes.Boolean,
        required: true
    },
    isFree: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: true,
    }
})

//Defining Functions
seatSchema.methods.getNumberSeat = function(){
    return this.numberSeat;
}

seatSchema.methods.getClasses = function(){
    return this.classes;
}

seatSchema.methods.getLegroom = function(){
    return this.legroom;
}
seatSchema.methods.isFreeSeat = function(){
    return this.isFree;
}

seatSchema.methods.setNumberSeat = function(numberSeat: string){
    this.numberSeat = numberSeat;
}

seatSchema.methods.setClasses = function(classes: string){
    this.classes = classes;
}

seatSchema.methods.setLegroom = function(legroom: boolean){
    this.legroom = legroom;
}
seatSchema.methods.setSeat = function(isFree: boolean){
    this.isFree = isFree;
}

export function getSchema() { return seatSchema; }

// Mongoose Model
let seatModel;  // This is not exposed outside the model
export function getModel() : mongoose.Model<Seats>  { // Return Model as singleton
    if( !seatModel ) {
        seatModel = mongoose.model('Seat', getSchema() )
    }
    return seatModel;
}

export function newSeat( data ): Seats {
    let _seatModel = getModel();
    return new _seatModel(data);
}