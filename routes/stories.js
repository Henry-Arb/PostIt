//Any route that is related to stories
//Any route that is top-level (anything that ends with / e.g. localhost:PORT/ or localhost:dashboard/)
const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/authMiddleware')
const Story = require('../models/Story')

// @desc Show story add page
// @route GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
	res.render('stories/addStory')
})

// @desc Process story add page
// @route POST /stories
router.post('/', ensureAuth, async (req, res) => {
	try {
		req.body.user = req.user.id
		await Story.create(req.body)
		res.redirect('/dashboard')
	} catch (error) {
		console.error(error)
		res.render('error/500')
	}
})

// @desc Show show all stories
// @route GET /stories/
router.get('/', ensureAuth, async (req, res) => {
	try {
		const stories = await Story.find({ status: 'public' })
			.populate('user')
			.sort({ createdAt: 'desc' })
			.lean()
		res.render('stories/indexStory', { stories })
	} catch (error) {
		console.error(error)
		res.render('error/500')
	}
})

module.exports = router
