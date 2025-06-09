import mongoose = require('mongoose');
import { Tickets } from './Tickets';
import crypto = require('crypto');


export interface Users extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId,
    passportID: string,
    username: string,
    mail: string,
    roles: string,
    salt: string,    // salt is a random string that will be mixed with the actual password before hashing
    digest: string,  // this is the hashed password (digest of the password)
    tickets : Tickets[]

    setPassword: (pwd:string)=>void,
    validatePassword: (pwd:string)=>boolean,
    hasAdminRole: ()=>boolean,
    hasAirlineRole: () => boolean,
    hasPassangerRole: () => boolean,
    setRole: (role: string) => void,
    getTickets: () => Tickets[],
    setTickets: (tickets: Tickets[]) => void,
    addTicket: (ticket: Tickets) => void
}

//Definig the schema
const userSchema = new mongoose.Schema<Users>({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    passportID: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    mail: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    roles: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    salt:  {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    digest:  {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    tickets : {
        type : Array.of<Tickets>()
    }
})

//Defining functions
userSchema.methods.setPassword = function(pwd:string){
    this.salt = crypto.randomBytes(16).toString('hex');
    const hmac = crypto.createHmac('sha512', this.salt );
    hmac.update( pwd );
    this.digest = hmac.digest('hex');
}

userSchema.methods.validatePassword = function( pwd:string ):boolean {
    const hmac = crypto.createHmac('sha512', this.salt );
    hmac.update(pwd);
    const digest = hmac.digest('hex');
    return (this.digest === digest);
}

userSchema.methods.hasAdminRole = function(): boolean{
    if(this.roles === "admin")
        return true;
    return false;
}

userSchema.methods.hasAirlineRole = function(){
    if(this.roles === "airline")
        return true;
    return false;
}

userSchema.methods.hasPassangerRole = function(){
    if(this.roles === "passenger")
        return true;
    return false;
}

userSchema.methods.setRole = function(role: string){
    if( role!= "admin" && role!= "airline" && role!= "passenger") 
        console.error("Inexistent role.");
    else 
        this.roles = role;
}

userSchema.methods.getTickets = function() : Tickets[]{
    return this.tickets;
}

userSchema.methods.setTickets = function(tickets : Tickets[]){
    this.tickets = tickets;
} 

userSchema.methods.addTicket = function(ticket: Tickets){
    this.tickets.push(ticket);
}

export function getSchema() { return userSchema; }

// Mongoose Model
let userModel: any;  // This is not exposed outside the model
export function getModel() : mongoose.Model< Users>  { // Return Model as singleton
    if( !userModel ) {
        userModel = mongoose.model('Users', getSchema() )
    }
    return userModel;
}

export function newUser( data ): Users {
    let _usermodel = getModel();
    return new _usermodel(data);
}


