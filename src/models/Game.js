import mongoose from 'mongoose'
const { String, Number, Boolean, ObjectId } = mongoose.Schema.Types

const gameSchema = new mongoose.Schema({
	players: [
		{
			type: ObjectId,
			ref: "Player"
		}
	],
	deck: {
		type: Array,
		default: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],
	},
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