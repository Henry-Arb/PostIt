//Any route that is top-level (anything that ends with / e.g. localhost:PORT/ or localhost:dashboard/)
const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/authMiddleware')
const Story = require('../models/Story')

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
	res.render('loginPage', {
		layout: './layouts/loginLayout',
	})
})

// @desc Dashboard page
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
	console.log(req.user)
	//looks for a view called dashboardPage
	try {
		const stories = await Story.find({ user: req.user.id }).lean()
		res.render('dashboardPage', { name: req.user.firstName, stories })
	} catch (error) {
		res.render('error/500')
	}
})

module.exports = router
