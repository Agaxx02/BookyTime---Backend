const User = require('../models/User');

module.exports = {
	loginUser: async (req, res) => {
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
	},
};
