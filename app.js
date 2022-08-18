const path = require('path')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const ejs = require('ejs')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const moment = require('moment')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 5000

// Load Config
dotenv.config({ path: './config/config.env' })

//Passport Config
require('./config/passport')(passport)

//Connects to Database
connectDB()

//Intializes app as express
const app = express()

//Helper functions
//Setting up moment
const dateFormat = 'MMMM Do YYYY @ h:mm:ss a'
app.locals.moment = moment
app.locals.dateFormat = dateFormat
app.locals.editIcon = function (
	storyUser,
	loggedUser,
	storyId,
	floating = true
) {
	if (storyUser._id.toString() == loggedUser._id.toString()) {
		if (floating) {
			return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
		} else {
			return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
		}
	} else {
		return ''
	}
}

//Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Method Override
app.use(
	methodOverride(function (req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			// look in urlencoded POST bodies and delete it
			let method = req.body._method
			delete req.body._method
			return method
		}
	})
)

//Runs morgan only on dev mode
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

//Setting Templating Engine
app.use(expressLayouts)
//Sets default layout
app.set('layout', './layouts/mainLayout')
//Sets view engine to ejs
app.set('view engine', 'ejs')

//Session middleware
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
	})
)

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Setting up static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

app.listen(
	PORT,
	console.log(`Sever is running in ${process.env.NODE_ENV} on port ${PORT}`)
)
