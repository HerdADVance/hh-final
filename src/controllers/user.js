import { User } from '../models/User'
import jwt from 'jsonwebtoken'
import connect from '../utils/db'
import options from '../config'

connect()

export default async (req, res) => {
	
	if (!("authorization" in req.headers)) {
		return res.status(401).send("No authorization found")
	}

	try {
		const { userId } = jwt.verify(req.headers.authorization, options.secrets.jwt)
		const user = await User.findOne({ _id: userId })
		
		if(user) {
			res.status(200).json(user)
		} else {
			res.status(404).send("User not found")
		}

	} catch (error) {
		res.status(403).send("Invalid token")
	}
}