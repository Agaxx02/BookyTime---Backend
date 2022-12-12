import express from 'express';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/database';

//routes
import homeRoutes from './src/routes/homeRoutes';
import loginRoutes from './src/routes/loginRoutes';
import registerRoutes from './src/routes/registerRoutes';
import booksRoutes from './src/routes/booksRoutes';
import profileRoutes from './src/routes/profileRoutes';

require('dotenv').config({ path: 'config/.env' });

connectDB();

app.use(cors());
app.use(express.json());

app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/library', booksRoutes);
app.use('/profile', profileRoutes);

//Execute app
app.listen(process.env.PORT || PORT, () => {
	console.log(`Server running on ${process.env.PORT}`);
});
