import mongoose from 'mongoose'
const { String, ObjectId } = mongoose.Schema.Types

const waitlistSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	users: [
		{
			type: ObjectId,
			ref: "User"
		}
	],
	live: {
		type: Boolean,
		default: false
	}

},	{ 
	timestamps: true 
})


export const Waitlist = mongoose.model('waitlist', waitlistSchema)