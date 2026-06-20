import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/tasks.js'
import connectDB from './config/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.send({ message: 'Task Management API is running' })
})

const startServer = async () => {
  await connectDB()
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
}

startServer()
