import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
//import { signup, signin, protect } from './utils/auth'
import connect  from './utils/db'
// import userRouter from './routers/user.router'
// import gameRouter from './routers/game.router'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// app.post('/signup', signup)
// app.post('/signin', signin)

export const home = (req, res) => {
  res.status(200).send("Hey there")
}
app.get('/', home)

// app.use('/api', protect)
// app.use('/api/user', userRouter)
// app.use('/api/item', itemRouter)
// app.use('/api/list', listRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}`)
    })
  } catch (e) {
    console.error(e)
  }
}
