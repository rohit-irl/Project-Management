import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/tasks.js'
import connectDB from './config/db.js'

// server.js starts the Express application and wires route handlers.
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.send({ message: 'Task Management API is running' })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
