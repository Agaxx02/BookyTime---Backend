const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');

//routes
const homeRoutes = require('./src/routes/homeRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const registerRoutes = require('./src/routes/registerRoutes');
const booksRoutes = require('./src/routes/booksRoutes');

require('dotenv').config({ path: 'config/.env' });

connectDB();

app.use(cors());
app.use(express.json());

app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/dashboard', booksRoutes);
app.use('/library', booksRoutes);

//Execute app
app.listen(process.env.PORT || PORT, () => {
	console.log(`Server running on ${process.env.PORT}`);
});
