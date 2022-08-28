//Any route that is related to authentication
const express = require('express')
const passport = require('passport')
const authController = require('../controller/authController')
const router = express.Router()

// @desc Auth with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	(req, res) => {
		res.redirect('/dashboard')
	}
)
// @desc logout User
// @route GET /auth/logout
router.get('/logout', authController.logout)

module.exports = router
