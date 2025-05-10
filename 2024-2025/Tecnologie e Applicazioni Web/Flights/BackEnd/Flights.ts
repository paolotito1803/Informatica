import mongoose = require('mongoose')

export interface Flights extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId
}