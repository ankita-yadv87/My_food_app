// const express = require("express");
// const router = express.Router();
// const mongoose = require('mongoose');
// const getuser = require('../middleware/getuser');
// const Note = require('../models/Note');
// const { body, validationResult } = require("express-validator");
// // const { Schema } = mongoose;

// //Route: 1 Get All Notes using : GET "/api/notes/fethuser". login required
// router.get('/fetchallnotes', getuser, async (req, res) => {
//     try {
//         const notes = await Note.find({ user: req.user.id }) //here we'll get all notes by passing user id which we are getting from fetchuser middleware
//         res.json(notes);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Internal Server Error");
//     }

// })

// //Route: 2 Add a new note using : post "/api/notes/addnote". login required
// router.post('/addnote', fetchuser, [
//     body("title", "enter a valid title").isLength({ min: 3 }),
//     body("description", "description must be of five characters").isLength({ min: 5 }),
// ], async (req, res) => {
//     try {
//         const { title, description, tag } = req.body;//taking out these three things from body
//         //if there are errors return bad request
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const note = new Note({
//             title, description, tag, user: req.user.id
//         })
//         const saveNote = await note.save();

//         res.json(saveNote);

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })

// //Route: 3 Updating an existing note : put "/api/notes/updatenote". login required
// router.put('/updatenote/:id', fetchuser, async (req, res) => {
//     const { title, description, tag } = req.body; //taking out these three things from body

//     try {

//         //creating a newnote object
//         const newNote = {};
//         if (title) { newNote.title = title };
//         if (description) { newNote.description = description };
//         if (tag) { newNote.tag = tag };


//         //find the note to be updated 
//         //checking if note  to be updated exists or not
//         let note = await Note.findById(req.params.id);
//         if (!note) {
//             return res.status(404).send("not found");
//         }

//         //if logged in person trying to update another users note
//         if (note.user.toString() !== req.user.id) {
//             res.status(401).send("not allowed")
//         }

//         //updating note
//         note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
//         res.json({ note });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Internal Server Error");
//     }

// })


// //Route: 4 Deleting an existing note : delete "/api/notes/deletenote". login required
// router.delete('/deletenote/:id', fetchuser, async (req, res) => {
//     const { title, description, tag } = req.body; //taking out these three things from body

//     try {

//         //find the note to be deleted 
//         //checking if note  to be deleted exists or not
//         let note = await Note.findById(req.params.id);
//         if (!note) {
//             return res.status(404).send("not found");
//         }

//         //if logged in person trying to update another users note
//         if (note.user.toString() !== req.user.id) {
//             return res.status(401).send("not allowed")
//         }

//         //deleting note
//         note = await Note.findByIdAndDelete(req.params.id);
//         res.json({ "Success": "Note has been deleted", note: note });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Internal Server Error");

//     }

// })


// // // User.createIndexes();
// module.exports = router;
