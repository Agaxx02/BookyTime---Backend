const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 8000;

require('dotenv').config({ path: './config/.env' });

const ObjectId = require('mongoose').Types.ObjectId;

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	confirmPassword: String,
});

const User = mongoose.model('User', userSchema);

const booksSchema = new mongoose.Schema({
	userId: mongoose.Schema.ObjectId,
	books: [
		{
			title: String,
			author: String,
			numOfPages: Number,
		},
	],
});
const Books = mongoose.model('Books', booksSchema);

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};
connectDB();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	app.listen(process.env.PORT || PORT, () => {
		console.log(`Server running on ${process.env.PORT}`);
	});
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/register', async (req, res) => {
	const { username, password, confirmPassword } = req.body;
	const user = await User.findOne({ username }).exec();
	if (user) {
		res.status(500);
		res.json({
			message: 'User already exists',
		});
		return;
	} else if (password.length < 8 || password.toLowerCase() === password) {
		res.status(500);
		res.json({
			message:
				'Password has to be at least 8 characters long and contain at least one uppercase letter',
		});
		return;
	} else if (password !== confirmPassword) {
		res.status(500);
		res.json({
			message: 'Passwords are different',
		});
		return;
	}
	await User.create({ username, password });
	res.json({
		message: 'User successfully created',
	});
});
app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).exec();
	if (!user || user.password !== password) {
		res.status(500);
		res.json({
			message: 'Invalid login or password',
		});
		return;
	}
	res.json({
		message: 'success',
	});
});
app.post('/books', async (req, res) => {
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
	const books = await Books.findOne({ userId: user._id }).exec();
	if (!books) {
		await Books.create({
			userId: user._id,
			books: booksItems,
		});
	} else {
		books.books = booksItems;
		await books.save();
	}
	res.send(books);
});

app.get('/books', async (req, res) => {
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
	const books = await Books.findOne({ userId: user._id }).exec();
	if (!books) {
		res.json([]);
	} else {
		res.json(books);
	}
});
