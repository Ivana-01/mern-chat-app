const express = require ('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const msgRoutes = require('./routes/msgRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    {
        credentials: true, 
        origin: ['http://localhost:3000', 'https://ivana-01-chat-app.onrender.com'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'token']
    }
))
app.use(cookieParser())

//.env config
const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGODB)
.then(() => console.log('DB connected'))
.then(() => app.listen(port, () => {
    console.log(`Backend server is running on ${port}!`)}))
.catch((err) => console.log(err))

//routes
app.use('/api/auth', authRoutes)
app.use('/api/messages', msgRoutes)
app.use('/api/users', userRoutes)
