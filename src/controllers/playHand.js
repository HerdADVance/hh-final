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

	req.io.emit(gameId, 'sending from controllerrrrrrr')
	return res.status(200).send('done')
	
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
			if(player.user == userId) userPlayer = player
				else opponentPlayer = player
		})

		if( !userPlayer ) return res.status(401).send("Not authorized to play this game")


		// Validate that cards from user's played hand exist, then remove them from active cards
		hand.forEach(function(card){
			if(!userPlayer.cards.includes(card)) return res.status(401).send("User doesn't have these cards in their hand")
			userPlayer.cards = userPlayer.cards.filter(item => item !== card)
		})


		console.log(userPlayer)

		// Save player with hand removed from active cards and saved as hand for appropriate round
		const round = game.round
		await Player.findOneAndUpdate(
			{ _id: userPlayer._id},
			{ $set: { 
				cards: userPlayer.cards,
				[`hand${round}`]: hand
			} }
		)


		// User's play is valid so see if opponent has played
		const opponentHand = opponentPlayer[`hand${round}`]
		
		// If opponent has played, compare hands, update game round and player scores, return new board
		if( opponentHand.length === 2) {

			const comparedHands = [1,0] //compareHands(hand, opponentHand, game[`board${round}`])
			const newRound = round + 1

			// Update user player score
			await Player.findOneAndUpdate(
				{ _id: userPlayer._id},
				{ $set: { score: userPlayer.score + comparedHands[0] } }
			)

			// Update opponent player score
			await Player.findOneAndUpdate(
				{ _id: opponentPlayer._id},
				{ $set: { score: opponentPlayer.score + comparedHands[1] } }
			)

			const updatedGame = await Game.findOneAndUpdate(
				{_id: gameId},
				{ $set: { round: newRound } },
				{"new": true}
			)
			.populate({ 
				path: "players", 
				model: Player,
				populate: {
					path: "user", 
					model: User
				} 
			})

			console.log(updatedGame)

			res.status(200).json({
				opponentHasPlayed: true,
				gameDetails: updatedGame
			})
		} 
		
		// Opponent hasn't played so return waiting for opponent message
		else {

			res.status(200).json({
				opponentHasPlayed: false
			})
		}




	} catch (error) {
		console.log(error)
		res.status(403).send("Couldn't find game")
	}

}

