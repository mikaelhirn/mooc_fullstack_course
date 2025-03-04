require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
	
const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl)

app.get('/api/blogs/', (req, res) => {
	Blog
		.find({})
		.then(blogs => {
			res.json(blogs)
		})
})

app.post('/api/blogs/', (req, res) => {
	const blog = new Blog(req.body)
	console.log('blog: ', blog)
	blog
		.save()
		.then(savedData => {
			res.status(201).json(savedData)
		})
		.catch(error => next(error))
})

const PORT = 3003
app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`)
})
