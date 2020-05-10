import mongoose from 'mongoose'
const { String, Number, Boolean, ObjectId } = mongoose.Schema.Types

const gameSchema = new mongoose.Schema({
	players: [
		{
			type: ObjectId,
			ref: "Player"
		}
	],
	board1: [
		{
			type: Number,
			min: 1,
			max: 52
		}
	],
	board2: [
		{
			type: Number,
			min: 1,
			max: 52
		}
	],
	board3: [
		{
			type: Number,
			min: 1,
			max: 52
		}
	],
	board4: [
		{
			type: Number,
			min: 1,
			max: 52
		}
	],
	board5: [
		{
			type: Number,
			min: 1,
			max: 52
		}
	],
	round: {
		type: Number,
		default: 1
	},
	live: {
		type: Boolean,
		default: false
	},
	turnLimit: {
		type: Number,
		default: 86400
	}

},	{ 
	timestamps: true 
})

gameSchema.pre('validate', function(next) {
    if (this.players.length < 2) throw("Not enough players");
    if (this.players.length > 2) throw("Too many players");
    next();
});

export const Game = mongoose.model('game', gameSchema)