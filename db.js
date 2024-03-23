const mongoose = require('mongoose')
require('dotenv').config();


mongoose.connect(`${process.env.URI}`);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to DB...");
});

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
})


const accountSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'User',
      required: true
  },
  balance: {
      type: Number,
      required: true
  }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
User,
  Account
};