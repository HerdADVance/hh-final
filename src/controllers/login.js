import { User } from '../models/User'
import connect from '../utils/db'
import options from '../config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'

connect()

export default async(req, res) => {

	const { login, password } = req.body

	try {

		// Check to see if user attempted login with email or username and if user exists
		let user

		if(isEmail(login)){
			user = await User.findOne({ email: login }).select('+password')
		} else {
			user = await User.findOne({ username: login }).select('+password')
		}
		

		// Return error if user doesn't exist
		if(!user) return res.status(404).send("No user exists with that username or e-mail")

		// See if passwords match
		const passwordsMatch = await bcrypt.compare(password, user.password)

		// Generate token and send to client or error if no match
		if(passwordsMatch) {
			const token = jwt.sign({ userId: user._id }, options.secrets.jwt, { expiresIn: '30d' })
			res.status(200).json({user: user, token: token})
		} else {
			res.status(401).send("Password is incorrect")
		}

	} catch (error) {
		console.error(error)
		res.status(500).send("Error logging in.")
	}

}
