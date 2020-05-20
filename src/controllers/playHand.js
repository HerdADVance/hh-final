import { User } from '../models/User'
import { Game } from '../models/Game'
import { Player } from '../models/Player'
import jwt from 'jsonwebtoken'
import connect from '../utils/db'
import options from '../config'
import find from 'lodash/find'

connect()

export default async (req, res) => {
	
	console.log("play hand controller")

	const { hand, gameId } = req.body
	const { userId } = jwt.verify(req.headers.authorization, options.secrets.jwt)
	
	if( !userId ) return res.status(401).send("Not authorized to play this game")

	try{

		// Find and populate game
		const game = await Game.findOne({
			_id: gameId
		})
		.populate({ 
			path: "players", 
			model: Player
		})

		// Validate if user is in game and send error if not
		let userPlayer = false
		let opponentPlayer = false

		game.players.forEach(function(player){
			if(player.user == userId) userPlayer = player._id
				else opponentPlayer = player._id
		})

		if( !userPlayer ) return res.status(401).send("Not authorized to play this game")

		
		// Validate that cards from user's played hand exist
		hand.forEach(function(card){
			if(!userPlayer.cards.includes(card)) return res.status(401).send("User doesn't have these cards in their hand")
		})


		// User's play is valid so see if opponent has played
		const round = game.round
		const opponentHand = opponentPlayer[`hand${round}`]
		
		// If opponent has played, compare hands, update hand, score and round, return new board
		if( opponentHand.length === 2) {

			//compareHands(hand, opponentHand, game[`board${round}`])
			const newRound = round + 1

			await Player.findOneAndUpdate(
				{_id: userPlayer._id, }
			)

			await Player.findOneAndUpdate(
				{_id: userPlayer._id, }
			)

			await updatedGame = Game.findOneAndUpdate({
				_id: gameId, "round": newRound,
				new: true
			})
			.populate({ 
				path: "players", 
				model: Player,
				populate: {
					path: "user", 
					model: User
				} 
			})

			res.status(200).json({
				opponentHasPlayed: true,
				gameDetails: updatedGame
			})
		} 
		
		// Opponent hasn't played so update user's hand for this round and return waiting for opponent message
		else {
				
			await Player.findOneAndUpdate( 
				{ _id: userPlayer._id}, 
				{ $set: { `hand${round}`: hand } }
			)

			res.status(200).json({
				opponentHasPlayed: false
			})
		}




	} catch (error) {
		console.log(error)
		res.status(403).send("Couldn't find game")
	}

}

