const Story = require('../models/Story')

module.exports = {
	addStory: (req, res) => {
		res.render('stories/addStory')
	},
	createStory: async (req, res) => {
		try {
			req.body.user = req.user.id
			await Story.create(req.body)
			res.redirect('/dashboard')
		} catch (error) {
			console.error(error)
			res.render('error/500')
		}
	},
	showStories: async (req, res) => {
		try {
			const currentUser = req.user._id
			const stories = await Story.find({ status: 'public' })
				.populate('user')
				.sort({ createdAt: 'desc' })
				.lean()
			res.render('stories/indexStory', {
				stories,
				currentUser: currentUser,
			})
		} catch (error) {
			console.error(error)
			res.render('error/500')
		}
	},
	showStory: async (req, res) => {
		try {
			const currentUser = req.user._id
			let story = await Story.findById(req.params.id)
				.populate('user')
				.lean()
			if (!story) {
				return res.render('error/404')
			}
			res.render('stories/showStory', { story, currentUser: currentUser })
		} catch (error) {
			console.error(error)
			res.render('error/404')
		}
	},
	editStory: async (req, res) => {
		try {
			const story = await Story.findOne({
				_id: req.params.id,
			}).lean()

			if (!story) {
				res.render('error/404')
			}

			if (story.user.toString() !== req.user._id.toString()) {
				res.redirect('/stories')
			} else {
				res.render('stories/editStory', {
					story,
				})
			}
		} catch (error) {
			console.error(error)
			res.render('error/500')
		}
	},
	updateStory: async (req, res) => {
		try {
			let story = await Story.findById(req.params.id).lean()

			if (!story) {
				return res.render('error/404')
			}

			if (story.user != req.user.id) {
				res.redirect('/stories')
			} else {
				story = await Story.findOneAndUpdate(
					{ _id: req.params.id },
					req.body,
					{
						new: true,
						runValidators: true,
					}
				)

				res.redirect('/dashboard')
			}
		} catch (err) {
			console.error(err)
			return res.render('error/500')
		}
	},
	deleteStory: async (req, res) => {
		try {
			await Story.remove({ _id: req.params.id })
			res.redirect('/dashboard')
		} catch (error) {
			console.log(error)
			res.render('error/500')
		}
	},
	userStory: async (req, res) => {
		try {
			const currentUser = req.params.userId
			const stories = await Story.find({
				user: currentUser,
				status: 'public',
			})
				.populate('user')
				.lean()
			res.render('stories/userStory', { stories })
		} catch (error) {
			console.log(error)
			res.render('error/404')
		}
	},
}
