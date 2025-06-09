import mongoose = require("mongoose");

export interface Seats extends mongoose.Document{
    readonly _numSeat : string,
    class : string,
    legroom : boolean,
    isFree : boolean,

    getClass : () => string,
    getLegroom : () => boolean,
    getIsFree : () => boolean,
    setClass : (clas: string) => void,
    setLegroom : (legroom : boolean) => void,
    setIsFree : () => void
}

const seatSchema = new mongoose.Schema<Seats>({
    _numSeat : {
        type : mongoose.SchemaTypes.String,
        required : true,
        unique : true,
    },
    legroom : {
        type : mongoose.SchemaTypes.Boolean,
        required : true,
        default : false
    },
    isFree : {
        type : mongoose.SchemaTypes.Boolean,
        required: true,
        default : true
    },
    class : {
        type : mongoose.Schema.Types.String,
        required : true 
    }
})

seatSchema.methods.getClass = function() : string {
    return this.class;
}

seatSchema.methods.getLegroom = function() : boolean{
    return this.legroom;
}

seatSchema.methods.getIsFree = function() : boolean{
    return this.isFree;
}

seatSchema.methods.setClass = function(clas : string){
    this.class = clas;
}

seatSchema.methods.setLegroom = function(legroom : boolean){
    this.legroom = legroom;
}

seatSchema.methods.setIsFree = function(){
    this.isFree = !this.isFree;
}

export function getSchema() { return seatSchema; }

// Mongoose Model
let seatModel: any;  // This is not exposed outside the model
export function getModel() : mongoose.Model<Seats>  { // Return Model as singleton
    if( !seatModel ) {
        seatModel = mongoose.model('Seats', getSchema() )
    }
    return seatModel;
}

export function newSeat( data ): Seats {
    let _seatModel = getModel();
    return new _seatModel(data);
}