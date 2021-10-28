// Importing Library
const mongoose = require('mongoose');

// Creating Schema for storing data in collection
const UserShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Creating model with schema and exporting it
module.exports = mongoose.model("User", UserShema);
