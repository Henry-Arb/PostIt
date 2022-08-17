const mongoose = require('mongoose')

//Connects to database
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI)
		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

//Spits out connectDB when db.js is called
module.exports = connectDB
