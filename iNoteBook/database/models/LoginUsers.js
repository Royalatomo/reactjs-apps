// Importing Library
const mongoose = require('mongoose');

// Creating Schema for storing data in collection
const LoginUserSchema = mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },

    authToken: {
        type: String,
        unique: true,
        required: true
    }
})

// Creating model with schema and exporting it
module.exports = mongoose.model("loginuser", LoginUserSchema)
