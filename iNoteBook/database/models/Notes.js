// Importing Library
const mongoose = require('mongoose');

// Creating Schema for storing data in collection
const NoteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String
    },
    tags: {
        type: String,
        default: "General"
    }
});

// Creating model with schema and exporting it
module.exports = mongoose.model("note", NoteSchema);
