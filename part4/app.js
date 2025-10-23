const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const blogsRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')

mongoose.set('strictQuery', false)

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

mongoose.connect(config.MONGO_URL)

app.use('/api/blogs/', blogsRouter)
app.use('/api/users/', usersRouter)

module.exports = app
