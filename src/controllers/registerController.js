const User = require('../models/User');

module.exports = {
	registerUser: async (req, res) => {
		const { username, password } = req.body;
		const user = await User.findOne({ username }).exec();
		if (user) {
			res.status(500);
			res.json({
				message: 'User already exists',
			});
			return;
		}
		await User.create({
			username,
			password,
			picture: 'https://i.ibb.co/zJYgcDV/znak-zapytania.webp',
			goal: 0,
		});
		res.json({
			message: 'User successfully created',
		});
	},
};
