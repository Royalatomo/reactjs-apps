// Importing Libraries
const jwt = require('jsonwebtoken'); // generating auth token

// Configuring Env variables
const configData = require('../config')

// Importing Model
const LoginUsers = require('../models/LoginUsers');

// Signature Secret
const JWT_SECRET = configData.JWT_SECRET;


// Used to fetch user id  from token
const fetchUserId = async (req, res, next) => {

    // Getting token from header
    const token = req.header('auth-token');

    // If none token is send by the user
    if (!token) {

        res.status(401).json({ success: false, error: "Invalid Authentication Token" })
    } else {

        try {

            // Get data from token
            const data = jwt.verify(token, JWT_SECRET);

            // Take user email from authToken and find it in logged in users collection
            let user = await LoginUsers.findOne({ email: data.user.email })

            // If User is found
            if (user) {

                // Then check if the user given authToken matches with the authToken which is assigned to this email currently
                if (user.authToken === token) {

                    // Fetch user field from the data dictonary and store in "Req.user"
                    req.user = data.user;

                    // Run the other function
                    next()
                } else {
                    res.status(401).send({ success: false, error: "Invalid Authentication Token" })
                }

            } else {
                res.status(401).send({ success: false, error: "Invalid Authentication Token" })
            }

        } catch (error) {
            console.log(error)
            // Is something went wrong
            res.status(401).send({ success: false, error: "Invalid Authentication Token" })
        }
    }

}

module.exports = fetchUserId;
