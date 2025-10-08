import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import notesRouter from './routes/notesRoutes.js'
import { connectDB } from './config/db.js'
import rateLimitter from './middleware/rateLimiter.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5001
app.use(cors())

//middleware
app.use(express.json())
// app.use((req, res, next) => {
//     console.log(`Req Method${req.method} & Req.URI is ${req.url}`);
//     next()
app.use(rateLimitter)


// }) 
app.use('/api/notes', notesRouter)

connectDB().then(()=>{
app.listen(PORT, () => {
    console.log('your server is running on port ', PORT);
    })

})




