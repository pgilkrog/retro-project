import dotenv from 'dotenv'
import express from 'express'
import { ConnectionDatabase } from './config/db'
import path from 'path'
import socketio, { Server } from 'socket.io'
import cors from 'cors'
import * as http from 'http'

// Load the enviroment variables from the .env file
dotenv.config({
    path: './.env'
})

const connection = new ConnectionDatabase
connection.connectDB()

const app = express()
app.use(express.json())

app.use(cors())

// set up routes
app.use('/api/program', require('./routes/programRoute'))
app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/error', require('./routes/errorRoute'))
app.use('/api/files', require('./routes/fileRoute'))

// Folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Get port from enviroment file or use 5000
const PORT = process.env.APP_PORT || 5000

// Create the server
const server = http.createServer(app)

// Set up socket io
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:5173',
        methods: ['GET', 'POST', 'PUT'],
    }
})

interface ChatMessage {
    room: string,
    text: string,
    sender: string
}

const activeRooms: { [room: string]: string[] } = {}

io.on('connection', async (socket) => {
    console.log('a user connected')
    
    socket.on('joinRoom', (roomName: string) => {
        console.log(roomName)
        if (!activeRooms[roomName]) {
            activeRooms[roomName] = []
        }
        activeRooms[roomName].push(socket.id)

        socket.join(roomName) 
        console.log(`User ${socket.id} joined room ${roomName}`);
    })

    socket.on('chatMessage', (message: ChatMessage) => {
        const { room, text, sender } = message
        console.log('message recieved', message)

        if (activeRooms[room]) {
            activeRooms[room].forEach((participant) => {
                io.to(participant).emit('chatMessage', { text, sender })
            })
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
        Object.keys(activeRooms).forEach((roomName) => {
            const index = activeRooms[roomName].indexOf(socket.id)
            if (index !== -1) {
                activeRooms[roomName].splice(index, 1)
                if (activeRooms[roomName].length === 0)
                    delete activeRooms[roomName]
            }
        })
    })
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))