const User = require('../models/User');

module.exports = {
	registerUser: async (req, res) => {
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
	},
};
