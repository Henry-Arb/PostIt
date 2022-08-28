//Any route that is top-level (anything that ends with / e.g. localhost:PORT/ or localhost:dashboard/)
const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/authMiddleware')
const indexController = require('../controller/indexController')
const Story = require('../models/Story')

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, indexController.getLogin)

// @desc Dashboard page
// @route GET /dashboard
router.get('/dashboard', ensureAuth, indexController.getDashboard)

module.exports = router
