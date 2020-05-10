import { User } from '../models/User'
import { Waitlist } from '../models/Waitlist'
import { Game } from '../models/Game'
import { Player } from '../models/Player'
import jwt from 'jsonwebtoken'
import connect from '../utils/db'
import options from '../config'
import DECK from '../utils/deck'
import shuffle from 'lodash/shuffle'

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

				// Create and shuffle deck for new game then pass out cards to players and boards
				const deck = shuffle(DECK)
				const playerCards = [ deck[0], deck[2], deck[4], deck[6], deck[8], deck[10], deck[12], deck[14], deck[16], deck[18] ]
				const opponentCards = [ deck[1], deck[3], deck[5], deck[7], deck[9], deck[11], deck[13], deck[15], deck[17], deck[19] ]
				const board1 = [ deck[20], deck[21], deck[22], deck[23], deck[24] ]
				const board2 = [ deck[25], deck[26], deck[27], deck[28], deck[29] ]
				const board3 = [ deck[30], deck[31], deck[32], deck[33], deck[34] ]
				const board4 = [ deck[35], deck[36], deck[37], deck[38], deck[39] ]
				const board5 = [ deck[40], deck[41], deck[42], deck[43], deck[44] ]
				
				// Create new players for game
				const newPlayer = await new Player({
					user: userId,
					cards: playerCards
				}).save()
				const newOpponent = await new Player({
					user: waitlist.users[0],
					cards: opponentCards
				}).save()

				// Creating the game
				const newGame = await new Game({
					players: [newPlayer._id, newOpponent._id],
					board1,
					board2,
					board3,
					board4,
					board5
				}).save()

				// Remove opponent from waitlist

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