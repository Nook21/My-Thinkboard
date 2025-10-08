import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import notesRouter from './routes/notesRoutes.js'
import { connectDB } from './config/db.js'
import rateLimitter from './middleware/rateLimiter.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

if (process.env.NODE_ENV !== "production") {
    app.use(cors({ origin: "http://localhost:5173", }))
}


//middleware
app.use(express.json())
app.use(rateLimitter)


// }) 
app.use('/api/notes', notesRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../FrontEnd/dist")))

  // ✅ Express 5-compatible catch-all route
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/dist/index.html"))
  })
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('your server is running on port ', PORT);
    })

})




