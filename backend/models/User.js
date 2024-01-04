const mongoose =require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
 name :{
    type : String,
    required: true
 },
 email :{
    type : String,
    required: true,
    unique : true,
 },
 password :{
    type : String,
    required: true
 },
 date :{
    type: Date,
    default: Date.now
 }
});

const Saloni= mongoose.model('Ankita', UserSchema);
// User.createIndexes();
module.exports = Saloni;

//in mongodb db will be created with this name ankita and will have the above schemas