import { User } from '../models/User'
import { Game } from '../models/Game'
import { Player } from '../models/Player'
import { Waitlist } from '../models/Waitlist'
import jwt from 'jsonwebtoken'
import connect from '../utils/db'
import options from '../config'

connect()

export default async (req, res) => {
	
	if (!("authorization" in req.headers)) {
		return res.status(401).send("No authorization found")
	}

	try {

		let canRequestGame = true
		let openGames = []
		let completedGames = []

		const { userId } = jwt.verify(req.headers.authorization, options.secrets.jwt)

		// See if existing Standard Games waitlist exists
		const waitlist = await Waitlist.findOne({ title: 'Standard Games' });

		// If waitlist exists see if user is already on it, if not, create it(would only apply to first user to ever visit dashboard) 
		if( waitlist ){
			const userOnWaitlist = waitlist.users.some(function (user) {
				return user.equals(userId)
			})
			if(userOnWaitlist) canRequestGame = false
		} else{
			const newWaitlist = await new Waitlist({
				title: 'Standard Games'
			}).save()
		}

		const userPlayers = await Player.find({
    		user: userId
		})

		const userGames = await Game.find({
			players: { "$in" : userPlayers }
		}).populate({ path: "players", model: Player })

		console.log(userGames[0])

		res.status(200).json({
			canRequestGame,
			openGames,
			completedGames
		})

		// Create new waitlist if none exist and add userId to its Users
		// if(!waitlist){
		// 	const newWaitlist = await new Waitlist({
		// 		title: 'Standard Games',
		// 		users: [userId]
		// 	}).save()
		// } else {
		// 	console.log(waitlist.users)
		// }

		
		
		// if(user) {
		// 	res.status(200).json(user)
		// } else {
		// 	res.status(404).send("User not found")
		// }


	} catch (error) {
		console.log(error)
		res.status(403).send("Invalid token")
	}
}