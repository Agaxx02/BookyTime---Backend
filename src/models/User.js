const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	picture: String,
	goal: Number,
});

module.exports = mongoose.model('User', userSchema);
