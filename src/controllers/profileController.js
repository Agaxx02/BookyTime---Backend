const User = require('../models/User');

module.exports = {
	updateProfile: async (req, res) => {
		const { authorization } = req.headers;
		const [, token] = authorization.split(' ');
		const [username, password] = token.split(':');
		const [key, value] = req.body;
		const user = await User.findOne({ username }).exec();
		if (!user || user.password !== password) {
			res.status(403);
			res.json({
				message: 'invalid access',
			});
			return;
		}
		user[key] = value;
		user.save();
		res.send({
			username: user.username,
			password: user.password,
			picture: user.picture,
			goal: user.goal,
		});
	},
};
