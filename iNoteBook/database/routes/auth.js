// Importing Libraries
const express = require('express');
const router = express.Router(); // exporting routes
const { body, validationResult } = require("express-validator"); //validation checking
const bcrypt = require('bcryptjs'); // salting and hashing the password
const jwt = require('jsonwebtoken'); // generating auth token

// Configuring Env variables
const configData = require('../config')

// Importing Models
const User = require('../models/User');

// Importing Middle Ware
const fetchUserDetails = require('../middleware/fetchUserId'); // fetch User Id from Auth-Token
const addRmLoginUser = require("../middleware/opLoginUser") // add user to loginUser collection if they are assigned a authToken

// Signature Secret
const JWT_SECRET = configData.JWT_SECRET;
const passwordPepper = configData.PASSWORD_PEPPER;


// PATH 1: Create User: POST: "/api/auth/create"  (No auth-toke required)
router.post('/create', [
    // Validation Checks
    body('name', "Enter Valid Name (min: 3, max: 100 chracters)").isLength({ min: 3 }),
    body('name', "Enter Valid Name (min: 3 chracters)").isLength({ max: 100 }),
    body('email', "Enter Valid Email").isEmail(),
    body('password').isLength({ min: 7 })
], async (req, res) => {

    // if the above validation fails return Error to the user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {

        // Check whether email exists already;
        let user = await User.findOne({ "email": req.body.email })

        if (user) {
            return res.status(400).json({ success: false, error: "User Already Exists" })
        }

        // Hashing and Salting the Password
        let securePass = req.body.password + passwordPepper;
        const salt = await bcrypt.genSalt(13);
        securePass = await bcrypt.hash(securePass, salt);

        // Create User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass
        })

        // Data to send inside token
        const data = {
            user: {
                id: user.id,
                email: user.email
            }
        }

        // Generating token
        const jwtAuthToken = jwt.sign(data, JWT_SECRET)

        // Adding User to Logged In Users collection
        addRmLoginUser(user.email, jwtAuthToken)
        res.json({ success: true, authToken: jwtAuthToken })

    } catch (error) {
        // If unexpected Error Occured
        console.error(error.message)
        res.status(500).send("Internal Server Error Occured!!")
    }
});


// PATH 2: Authenticate User: POST: "/api/auth/login" (No auth-token required)
router.post("/login", [
    // Validation Check
    body('email', "Enter Valid Email").isEmail(),
    body("password", "Password Can Not Be Blank").exists()
], async (req, res) => {

    // if the above validation fails return Error to the user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        // Fetching email and password from request
        const { email, password } = req.body;

        // Finding user with same email
        let user = await User.findOne({ email });

        // If No User Found
        if (!user) {
            res.status(400).json({ success: false, error: "Please Enter Correct Credentials" });
        } else {


            // Compaire (This pass hash) with (stored password hash in db)
            const hashPass = await bcrypt.compare(password + passwordPepper, user.password);

            // If Hash Doesn't Matches
            if (!hashPass) {
                res.status(400).json({ success: false, error: "Please Enter Correct Credentials" });
            } else {

                // Data to send inside token
                const data = {
                    user: {
                        id: user.id,
                        email: user.email
                    }
                }
                // Generating token
                const jwtAuthToken = jwt.sign(data, JWT_SECRET)

                // Adding User to Logged In Users collection
                addRmLoginUser(user.email, jwtAuthToken)

                res.json({ success: true, authToken: jwtAuthToken })
            }
        }


    } catch (error) {

        // If unexpected Error Occured
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured!!")
    }
})


// PATH 3: Fetch User Details: /api/auth/getuser (auth-token required)
router.get("/getuser", fetchUserDetails, async (req, res) => {
    try {
        // Getting user id (created by middleware)
        const userId = req.user.id;
        // Finding user with id and removing "Password, _id, __v" fields from database entry and returning to user
        const user = await User.findById(userId).select("-password").select("-_id").select("-__v");
        res.send(user);
    } catch (error) {
        // If unexpected Error Occured
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured!!")
    }
})


// PATH 4: Logout User: /api/auth/logout (auth-token required)
router.post("/logout", fetchUserDetails, async (req, res) => {

    // Remove from logged in users collection
    addRmLoginUser(req.user.email, null)
    res.json({ success: true, "message": "Logged out" });
})

module.exports = router;
