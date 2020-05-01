// import mongoose from 'mongoose'
// import options from '../config'

// export const connect = (url = options.dbUrl, opts = {}) => {
//   return mongoose.connect(
//     url,
//     { ...opts, useNewUrlParser: true }
//   )
// }

import mongoose from 'mongoose'
import options from '../config'

const connection = {}

async function connect() {

	if(connection.isConnected){
		console.log("using existing connection")
	}

	const db = await mongoose.connect(options.dbUrl, {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

	console.log("DB Connected")
	connection.isConnected = db.connections[0].readyState
}

export default connectDb
