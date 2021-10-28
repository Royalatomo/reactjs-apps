// Importing library
const express = require('express');
const dbConnect = require('./db');
const cors = require('cors')


// Configuring Library
const app = express();
dbConnect();
app.use(cors())


// Fetching Body Data
app.use(express.json())

// Creating Routes
app.use("/api/auth", require("./routes/auth.js"))
app.use("/api/notes", require("./routes/notes.js"))

app.listen('5000', () => { console.log("Server started on Post: 5000") })
