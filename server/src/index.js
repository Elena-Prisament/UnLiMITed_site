import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT || 5050

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'unlimited-api',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'not connected',
  })
})

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found' })
})

const connectDatabase = async () => {
  if (!process.env.MONGO_URI) {
    console.log('MONGO_URI not set; starting without a database connection.')
    return
  }

  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected.')
}

connectDatabase()
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`)
    })
  })
