import dotenv from 'dotenv'
import express from 'express'
import { ConnectionDatabase } from './config/db'

// Load the enviroment variables from the .env file
dotenv.config({
    path: './.env'
})

const connection = new ConnectionDatabase
connection.connectDB()

const app = express()
app.use(express.json())

// CORS
app.use((req: any, res: any, next: any) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS, PUT")
    next()
})

// set up routes
app.use('/api/program', require('./routes/programRoute'))
app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/error', require('./routes/errorRoute'))
app.use('/api/files', require('./routes/fileRoute'))

const PORT = process.env.APP_PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
