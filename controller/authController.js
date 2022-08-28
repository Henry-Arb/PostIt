const passport = require('passport')

exports.logout = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err)
		}
		res.redirect('/')
	})
}
