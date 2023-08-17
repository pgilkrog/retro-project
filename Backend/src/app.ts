import dotenv from 'dotenv'
import express from 'express'
import { ConnectionDatabase } from './config/db'
import path from 'path'
import socketio, { Server } from 'socket.io'
import cors from 'cors'
import * as http from 'http'
import { setupSocketIO } from './middleware/socketHander'

// Load the enviroment variables from the .env file
dotenv.config({
    path: './.env'
})

const connection = new ConnectionDatabase
connection.connectDB()

const app = express()
app.use(express.json({ limit: '10mb'}))

const corsOptions = {
    origin: 'http://127.0.0.1:5173',
    credentials: true
}
app.use(cors(corsOptions))

app.options('*', cors(corsOptions))

// set up routes
app.use('/api/program', require('./routes/programRoute'))
app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/error', require('./routes/errorRoute'))
app.use('/api/files', require('./routes/fileRoute'))
app.use('/api/paint', require('./routes/paintRoute'))

// Folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Get port from enviroment file or use 5000
const PORT = process.env.APP_PORT || 5000

// Create the server
const server = http.createServer(app)

setupSocketIO(server, app)

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))