import { User } from '../models/User'
import connect from '../utils/db'
import options from '../config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

connect()

export default async(req, res) => {

	const { email, username, password } = req.body

	try {

		// Validate values
		if (!isLength(username, { min: 3, max: 25})){
			return res.status(422).send("Username must be 3-25 characters.")
		} else if (!isLength(password, { min: 5, max: 32})){
			return res.status(422).send("Password must be 5-32 characters")
		} else if (!isEmail(email)){
			return res.status(422).send("Not a valid e-mail address.")
		}

		// See if email or username already exists
		const userByEmail = await User.findOne({ email })
		const userByUsername = await User.findOne({ username })
		if (userByEmail) return res.status(422).send(`There's already a user with that e-mail address: ${email}`)
		if (userByUsername) return res.status(422).send(`There's already a user with that username: ${username}`)

		// User can be created, hash password
		const hash = await bcrypt.hash(password, 10)

		// Create the new user
		const newUser = await new User({
			email,
			username,
			password: hash
		}).save()

		// Create token for the new user
		const token = jwt.sign({ userId: newUser._id }, options.secrets.jwt, { expiresIn: '30d' })

		// Send back token
		res.status(201).json({user: newUser, token: token})


	} catch (error) {
		console.error(error)
		res.status(500).send("Error signing up new user. Please try again later.")
	}

}
