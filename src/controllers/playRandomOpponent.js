import { User } from '../models/User'
import { Waitlist } from '../models/Waitlist'
import { Game } from '../models/Game'
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

		// Find the existing Standard Games waitlist
		const waitlist = await Waitlist.findOne({ title: 'Standard Games' });

		if( waitlist ){
			
			// See if user is already on waitlist
			const userOnWaitlist = waitlist.users.some(function (user) {
				return user.equals(userId)
			})

			// If user is already on waitlist, send error
			if(userOnWaitlist) return res.status(403).send("User already on waitlist")

			// Start new game if other user on waitlist
			if(waitlist.users[0]){
				
				const newGame = await new Game({
					players: [userId, waitlist.users[0]]
				}).save()

				res.status(200).json({
					canRequestGame: true,
					gameId: newGame._id
				})

			} else { // nobody to play yet so add user to waitlist
				
				await Waitlist.findOneAndUpdate (
					{ title: 'Standard Games' },
					{ $addToSet: { users: userId } }
				)
				res.status(200).json({
					canRequestGame: false,
					gameId: null
				})	
			}			
			
		} else{
			return res.status(403).send("Error finding waitlist")
		}


	} catch (error) {
		console.log(error)
		res.status(403).send("Invalid token")
	}
}