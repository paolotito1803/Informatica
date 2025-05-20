import mongoose = require('mongoose')
import crypto = require('crypto')


export interface Users extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId,
    username: string,
    mail: string,
    roles: string[],
    salt: string,    // salt is a random string that will be mixed with the actual password before hashing
    digest: string,  // this is the hashed password (digest of the password)
    setPassword: (pwd:string)=>void,
    validatePassword: (pwd:string)=>boolean,
    hasAdminRole: ()=>boolean,
    hasAirlineRole: () => boolean,
    hasPassangerRole: () => boolean,
    setRole: (role: string) => void

}

//Definig the schema
const userSchema = new mongoose.Schema<Users>({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    mail: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    roles: {
        type: [mongoose.SchemaTypes.String],
        required: true
    },
    salt:  {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    digest:  {
        type: mongoose.SchemaTypes.String,
        required: false
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

userSchema.methods.hasAdminRole = function(){
    for( let roleidx in this.roles ) {
        if( this.roles[roleidx] === 'admin' )
            return true;
    }
    return false;
}

airlineSchema.methods.hasAirlineRole = function(){
    for( let roleidx in this.roles ) {
        if( this.roles[roleidx] === 'airline' )
            return true;
    }
    return false;
}

userSchema.methods.hasPassangerRole = function(){
    for( let roleidx in this.roles ) {
        if( this.roles[roleidx] === 'passanger' )
            return true;
    }
    return false;
}

userSchema.methods.setRole = function(role: string){
    if(role != 'admin' && role != 'passenger' && role != 'airline'){
        console.error("Inexistent role");
    }
    else this.role.push(role)
}

export function getSchema() { return userSchema; }

// Mongoose Model
let userModel;  // This is not exposed outside the model
export function getModel() : mongoose.Model< Users>  { // Return Model as singleton
    if( !userModel ) {
        userModel = mongoose.model('User', getSchema() )
    }
    return userModel;
}

export function newUser( data ): Users {
    let _usermodel = getModel();
    let user = new _usermodel( data );

    return user;
}


