import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
//import { signup, signin, protect } from './utils/auth'
import connect  from './utils/db'
//import signupRouter from './routers/signup'
import signup from './controllers/signup'
import login from './controllers/login'
import user from './controllers/user'
import dashboard from './controllers/dashboard'
import playRandomOpponent from './controllers/playRandomOpponent'
import game from './controllers/game'
import playHand from './controllers/playHand'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// const io = start(true)
// app.use(function(req, res, next){
//   	req.io = io
//   	next();
// });


// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('User Disconnected');
//   });
//   socket.on('example_message', function(msg){
//     console.log('message: ' + msg);
//   });
// });
// io.listen(server);


app.post('/signup', signup)
app.post('/login', login)
app.get('/api/user', user)
app.get('/api/dashboard', dashboard)
app.get('/api/playRandomOpponent', playRandomOpponent)
app.get('/api/game/:id', game)
app.post('/api/game/:id/playHand', playHand)

// app.use('/signup', signupRouter)
// app.use('/api/user', userRouter)
// app.use('/api/item', itemRouter)
// app.use('/api/list', listRouter)

// try {
// 	await connect()
// 	const server = app.listen(config.port, () => {
// 	  console.log(`REST API on http://localhost:${config.port}`)
// 	})
// 	const io = require('socket.io').listen(server)
// 	io.on('connection', function(socket){
// 	  console.log('a user connected');
// 	  socket.on('disconnect', function(){
// 	    console.log('User Disconnected');
// 	  });
// 	  socket.on('example_message', function(msg){
// 	    console.log('message: ' + msg);
// 	  });
// 	});
// } catch (e) {
// 	console.error(e)
// }

export const start = async (started) => {
	try {

		if(!started){
		
			await connect()
			
			const server = await app.listen(config.port, () => {
			  console.log(`REST API on http://localhost:${config.port}`)
			
			})

			const io = await require('socket.io').listen(server)

		}


		

		// io.on('connection', function(socket){
			
		// 	socket.emit('thisgame', "sending from controller", "ct")
		//   	console.log('a user connected');
		  	
		//   	socket.on('disconnect', function(){
		//     	console.log('User Disconnected');
		//   	});
		  	
		//   	socket.on('example_message', function(msg){
		//     	console.log('message: ' + msg);
		//   	});
		// });


		return io

	} catch (e) {
		console.error(e)
	}
}

// export const startIo = async (server) => {
// 	const io = require('socket.io').listen(server)


