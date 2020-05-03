import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
	user: {
		type: Number,
		ref: "User"
	},
	cards: [
		{
			type: Number,
			min: 1,
			max: 52
		}
	],
	hand1: [
		{
			type: Number,
			min: 1,
			max: 52
		}
	],
	hand2: [
		{
			type: Number,
			min: 1,
			max: 52
		}
	],
	hand3: [
		{
			type: Number,
			min: 1,
			max: 52
		}
	],
	hand4: [
		{
			type: Number,
			min: 1,
			max: 52
		}
	],
	hand5: [
		{
			type: Number,
			min: 1,
			max: 52
		}
	],
	score: {
		type: Number,
		default: 0
	}

})

playerSchema.pre('validate', function(next) {
    if (this.cards.length > 10) throw("Too many cards");
    if (this.hand1.length > 2) throw("Too many cards in hand");
    if (this.hand2.length > 2) throw("Too many cards in hand");
    if (this.hand3.length > 2) throw("Too many cards in hand");
    if (this.hand4.length > 2) throw("Too many cards in hand");
    if (this.hand5.length > 2) throw("Too many cards in hand");
    next();
});

export const Player = mongoose.model('player', playerSchema)