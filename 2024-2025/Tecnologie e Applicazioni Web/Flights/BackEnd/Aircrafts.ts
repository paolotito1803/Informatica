import mongoose = require('mongoose')

export interface Aircrafts extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId
}