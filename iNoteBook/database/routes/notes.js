// Importing Libraries
const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator"); //validation checking

// Importing Model
const Notes = require('../models/Notes');

// Importing Middle Ware
const fetchUserDetails = require('../middleware/fetchUserId'); // fetch User Id from Auth-Token


// PATH 1:  Fetch All Notes Of the user: GET: "/api/notes/fetchall" (auth-token required)
router.get('/fetchall', fetchUserDetails, async (req, res) => {
    try {
        // Find All Notes with the user id (given in authToken)
        const allNotes = await Notes.find({ userId: req.user.id });
        res.json({ success: true, allNotes });

    } catch (error) {
        // If unexpected Error Occured
        console.error(error.message)
        res.status(500).send("Internal Server Error Occured!!")
    }
});


// PATH 2: Add New Notes For The User: POST: "/api/notes/addnote" (auth-token required)
router.post('/addnote', fetchUserDetails, async (req, res) => {


    try {

        let { title, content, tags } = req.body;
        let noteAdding = true

        // Add New Note to collection
        if (!tags) {
            tags = "default"
        }
        
        if (!title){
        	if (content){
        		title = ""
        	}else{
        		res.json({ "success": false, msg: "title or content one is required" })
        		noteAdding = false
        	}
        }else if (!content){
        	if (title){
        		content = ""
        	}else{
        		res.json({ "success": false, msg: "title or content one is required" })
    		        noteAdding = false
        	}
        }
        
        if (noteAdding){
        		
        await Notes.create({
            userId: req.user.id,
            title,
            content,
            tags
        })
        res.json({ success: true, msg: "note added!" })
        }

    } catch (error) {

        // If unexpected Error Occured
        console.error(error.message)
        res.status(500).send("Internal Server Error Occured!!")
    }

})


// PATH 3: Update an existing note: PUT: "/api/notes/updatenote" (auth-token required)
router.put("/updatenote", fetchUserDetails, async (req, res) => {
    try {

        let note = await Notes.findById(req.body.noteid)
        if (note && note.userId.toString() === req.user.id) {

            const { title, content, tags } = req.body;
            const newNote = {}
            if (title) { newNote.title = title };
            if (content) { newNote.content = content };
            if (tags) { newNote.tags = tags };


            await Notes.findByIdAndUpdate(req.body.noteid, { $set: newNote }, { new: true })
            res.json({ "success": "note updated!!" })

        } else {
            res.status(404).json({ error: "note not found with this Id!!" })
        }

    } catch (error) {

        // If unexpected Error Occured
        console.error(error.message)
        res.status(500).send("Internal Server Error Occured!!")
    }
})


// PATH 4: Remove Notes For the User: DELETE: "/api/notes/rmnote" (auth-token required)
router.delete('/rmnote', fetchUserDetails, async (req, res) => {
    try {

        let note = await Notes.findById(req.body.noteid)
        if (note && note.userId.toString() === req.user.id) {
            await Notes.findOneAndRemove({ _id: req.body.noteid });
            res.json({ "successs": "note deleted!" })
        } else {
            res.status(404).json({ error: "note not found with this Id!!" })
        }

    } catch (error) {

        // If unexpected Error Occured
        console.error(error.message)
        res.status(500).send("Internal Server Error Occured!!")
    }
})


module.exports = router;
