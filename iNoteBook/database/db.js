// Importing Library
const mongoose = require('mongoose');

// Database Connection Url
const dbUrl = "mongodb://localhost:27017/inotebook";

function connectDb() {
    mongoose.connect(dbUrl, () => { console.log("Connected to DB successfully") }, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connectDb;
