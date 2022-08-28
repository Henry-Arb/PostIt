const Story = require('../models/Story')

module.exports = {
	getDashboard: async (req, res) => {
		try {
			const stories = await Story.find({ user: req.user.id }).lean()
			res.render('dashboardPage', { name: req.user.firstName, stories })
		} catch (error) {
			res.render('error/500')
		}
	},
	getLogin: (req, res) => {
		res.render('loginPage', {
			layout: './layouts/loginLayout',
		})
	},
}
