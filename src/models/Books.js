const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
	username: String,
	books: [
		{
			title: String,
			author: String,
			numOfPages: Number,
			cover: String || null,
			rate: Number || null,
			read: Boolean,
			comment: String,
			dateAdded: Date,
			lastUpdated: Date,
		},
	],
});

module.exports = mongoose.model('Books', booksSchema);
