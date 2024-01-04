const express = require('express');
const router = express.Router();
const Saloni = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/User");
var getuser = require("../middleware/getuser");



const JWT_SECRET = "pinkishaloo123";

//Route: 1 create a user  using : Post "/api/auth/createuser". no login required
// Creating a user using : POST "/api/auth"
// it doesn't require authentication
router.post('/createuser', [
  body("name", "enter a valid name").isLength({ min: 3 }),
  body("email", "enter a valid email").isEmail(),
  body("password", "password must be a of atleast 3 characters").isLength({ min: 3 }),],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //checking if user with same email id  exists or not
    try {
      let success = false;
      let user = await Saloni.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({  success,error: "sorry a user with this email already exists" });
      }//if exists throwing error

      //password hashing
      const salt = await bcrypt.genSalt(10);
      const password1 = await bcrypt.hash(req.body.password, salt);

      //creating a new user
      user = await Saloni.create({
        name: req.body.name,
        email: req.body.email,
        password: password1,
      })
      const data = {
        user: {
          id: user.id
        }
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authtoken });
    }
    catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }

    // .then(user => res.json(user))
    // .catch(err => {
    //     console.log(err)
    //     res.json({ error: 'please enter a unique value for email', message: err.message })
    // });
  });


//Route: 2 Authenticating  a user  using : Post "/api/auth/login". no login required
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists()
  ],
  async (req, res) => {
    //if errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //taking out email pwd using destructuring
    try {

      //pulling user from database whose email is same as user
      let user = await Saloni.findOne({ email })

      if (!user) {
        return res.status(400).json({ error: "please enter valid credentials" });
      }//if user not  exists then we'll throw this error


      //email is correct then we will check if password is correct or not
      //internally comapre pwd and return true/false
      const passwordCompare = await bcrypt.compare(password, user.password);
      let success = false;
      if (!passwordCompare) {
        return res.status(400).json({success, error: "please enter valid credentials" });
      }

      //if password matches then we'll send user data
      const data = {
        user: {
          id: user.id
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authtoken });


    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");

    }
  }
);

//Route: 3 Get loggedin user details using : Post "/api/auth/getuser". login required
router.post(
  "/fetchuser", getuser, async (req, res) => {
    try {

      let userId = req.user.id;
      //we'll ger user id from auth token and then select all data except pwd
      const user = await Saloni.findById(userId).select("-password"); //we'll ger user id from auth token
      res.send(user);
    }
    catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  })



module.exports = router;
