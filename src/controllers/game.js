import { User } from '../models/User'
import { Game } from '../models/Game'
import { Player } from '../models/Player'
import jwt from 'jsonwebtoken'
import connect from '../utils/db'
import options from '../config'
import find from 'lodash/find'

connect()

export default async (req, res) => {
	
	console.log("game controller")

	let userPlayer = false
	if (("authorization" in req.headers)) {
		const { userId } = jwt.verify(req.headers.authorization, options.secrets.jwt)
		if( userId ) userPlayer = userId
	}

	try {

		// Find and populate the game
		const gameId = req.params.id
		const game = await Game.findOne({
			_id: gameId
		})
		.populate({ 
			path: "players", 
			model: Player,
			populate: {
				path: "user", 
				model: User
			} 
		})

		// Default info about game we're going to return 
		let gameInfo = {
			userinGame: false,
			board1: false,
			board2: false,
			board3: false,
			board4: false,
			board5: false,
			round: game.round,
			players: [],
		}

		// Return only current or previous boards
		for(var i = 1; i <= game.round; i++){
			gameInfo[`board${i}`] = game[`board${i}`]
		}

		// Return info about each player 
		game.players.forEach(function(player){
			let playerInfo = {
				userid: player.user._id,
				username: player.user.username,
				isUser: false,
				cards: false,
				hand1: false,
				hand2: false,
				hand3: false,
				hand4: false,
				hand5: false,
				score: player.score
			}

			// Return only previous hands
			for(var i = 1; i < game.round; i++){
				playerInfo[`hand${i}`] = player[`hand${i}`]
			}

			// Check to see if user is player and return their cards if so
			if(player.user._id == userPlayer){
				gameInfo.userinGame = true
				playerInfo.isUser = true
				playerInfo.cards = player.cards
			}

			gameInfo.players.push(playerInfo)
		})


		// Send game data
		res.status(200).json({
			gameInfo
		})



	} catch (error) {
		console.log(error)
		res.status(403).send("Couldn't find game")
	}
}