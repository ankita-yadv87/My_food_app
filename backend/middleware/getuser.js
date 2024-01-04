var jwt = require('jsonwebtoken');
const { reset } = require('nodemon');
const JWT_SECRET = "pinkishaloo123";

const getuser = (req, res, next) => {

    //get a user from  jwt token and add id to req 

    //taking auth-token from header 
    const token = req.header('auth-token');

    //if token is incorrect or not exist in header throw error
    if (!token) {
        res.status(400).send({ error: "please authenticate using a valid token" });
    }


    try {
        //correct token case
        // verifying token and sending our secret key
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; //getting user from db
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate using a valid token" });
    }
};

module.exports = getuser;