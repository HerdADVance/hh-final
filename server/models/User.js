import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	friends: [
		{
			type: ObjectId,
			ref: 'User'
		}
	]

},	{ 
	timestamps: true 
})

export const User = mongoose.model('user', userSchema)