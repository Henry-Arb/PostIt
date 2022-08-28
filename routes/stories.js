//Any route that is related to stories
const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/authMiddleware')
const storyController = require('../controller/storyController')
const Story = require('../models/Story')

// @desc Show story add page
// @route GET /stories/add
router.get('/add', ensureAuth, storyController.addStory)

// @desc Process story add page
// @route POST /stories
router.post('/', ensureAuth, storyController.createStory)

// @desc Show all stories
// @route GET /stories/
router.get('/', ensureAuth, storyController.showStories)

// @desc Show single story page
// @route GET /stories/:id
router.get('/:id', ensureAuth, storyController.showStory)

// @desc Show story edit page
// @route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, storyController.editStory)

// @desc  Update story
// @route PUT /stories/:id
router.put('/:id', ensureAuth, storyController.updateStory)

// @desc Delete Story
// @route Delete /stories/:id
router.delete('/:id', ensureAuth, storyController.deleteStory)

// @desc User stories
// @route GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, storyController.userStory)

module.exports = router
