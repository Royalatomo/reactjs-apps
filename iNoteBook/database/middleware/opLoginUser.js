// Importing Model
const LoginUsers = require('../models/LoginUsers');

// This function makes sure the user is logged in with only one authToken. So that the hacker can't use the users old authToken to fetch details
const addLoginUser = async (email, authToken) => {

    // Get the user with email if present in Logged in Users collection
    let user = await LoginUsers.findOne({ email })

    // If Present
    if (user) {

        // Then remove it
        await LoginUsers.findOneAndRemove({ email })
    }

    // If AuthToken is given
    if (authToken) {

        // Add user with the given email and with it's current authToken
        user = await LoginUsers.create({
            email,
            authToken
        })
    }
}

module.exports = addLoginUser;
