import { User } from '../models/User'
import { Game } from '../models/Game'
import { Player } from '../models/Player'
import { Waitlist } from '../models/Waitlist'
import jwt from 'jsonwebtoken'
import connect from '../utils/db'
import options from '../config'
import find from 'lodash/find'

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

		// Find player's games with players and users
		const userPlayers = await Player.find({
    		user: userId
		})
		const userGames = await Game.find({
			players: { "$in" : userPlayers }
		})
		.populate({ 
			path: "players", 
			model: Player,
			populate: {
				path: "user", 
				model: User
			} 
		})


		// Sort through player's games and format needed data to send to client
		userGames.forEach(function(game) {
			let g = {}
			let user
			let opponent

			game.players.forEach(function(player){
				if(player.user._id == userId) user = player
					else opponent = player
			})

			g.id = game._id
			g.round = game.round
			g.userScore = user.score
			g.opponentScore = opponent.score
			g.opponentUsername = opponent.user.username
			openGames.push(g)
		})


		// Send all data to dashboard
		res.status(200).json({
			canRequestGame,
			openGames,
			completedGames
		})



	} catch (error) {
		console.log(error)
		res.status(403).send("Invalid token")
	}
}