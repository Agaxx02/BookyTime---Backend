const User = require('../models/User');
const Books = require('../models/Books');

module.exports = {
	getBooks: async (req, res) => {
		const { authorization } = req.headers;
		const [, token] = authorization.split(' ');
		const [username, password] = token.split(':');
		const user = await User.findOne({ username }).exec();
		if (!user || user.password !== password) {
			res.status(403);
			res.json({
				message: 'invalid access',
			});
			return;
		}
		const books = await Books.findOne({
			username: user.username,
		}).exec();
		if (!books) {
			res.json([]);
		} else {
			res.json(books);
		}
	},
	addBooks: async (req, res) => {
		const { authorization } = req.headers;
		const [, token] = authorization.split(' ');
		const [username, password] = token.split(':');
		const booksItems = req.body;
		const user = await User.findOne({ username }).exec();
		if (!user || user.password !== password) {
			res.status(403);
			res.json({
				message: 'invalid access',
			});
			return;
		}
		const books = await Books.findOne({
			username: user.username,
		}).exec();
		if (!books) {
			await Books.create({
				username: user.username,
				books: booksItems,
			});
		} else {
			books['books'] = booksItems;
			books.save();
		}
		res.send(books);
	},
	deleteBooks: async (req, res) => {
		const { authorization } = req.headers;
		const [, token] = authorization.split(' ');
		const [username, password] = token.split(':');
		const newBooks = req.body;
		const user = await User.findOne({ username }).exec();
		if (!user || user.password !== password) {
			res.status(403);
			res.json({
				message: 'invalid access',
			});
			return;
		}
		const books = await Books.findOne({
			username: user.username,
		}).exec();
		books.books = newBooks;
		books.save();
		res.send(newBooks);
	},
};
