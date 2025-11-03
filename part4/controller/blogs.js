const blogsRouter = require('express').Router()
const usersRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', (req, res) => {
	Blog
		.find({})
		.populate('user', {author: 1, name: 1})
		.then(blogs => {
			res.json(blogs)
		})
})

const getTokenFrom = req => {
	const auth = req.body['auth']
	if(auth && auth.startsWith('Bearer ')){
		return auth.replace('Bearer ', '')
	}
	return null
}

blogsRouter.post('/', async (req, res, next) => {
	
	const decToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
	console.log(decToken)

	if (!decToken.id){
		return res.status(401).json({ error: 'token invalid' })
	}

	const user = await User
		.findById(decToken.id)
		.then(x => {
			req.body.user = x.id
			return x
		})

	const blog = new Blog(req.body)

	if(blog.url == undefined || blog.title == undefined){
		console.log(blog)
		return res.status(404).end()
	}
	
	const savedBlog = await	blog
		.save()
		.then(savedData => {
			res.status(201).json(savedData)
			user.blogs = user.blogs.concat(savedData._id)
		})
		.catch(error => next(error))

	await user.save()
})

blogsRouter.put('/:id', (req, res, next) => {
	const id = req.params.id
	const likes = req.body.likes

	if(id === undefined){
		res.status(404).end()
	}

	Blog
		.findById(id)
		.then(blog => {
			if(!blog){
				return res.status(404).end()
			}

			blog.likes = likes

			return blog.save().then((updatedBlog) => {
				res.json(updatedBlog)
			})
		})
		.catch(error => next(error))
})

blogsRouter.delete('/:id', (req, res, next) => {
	const id = req.params.id

	if(id === undefined){
		res.status(404).end()
	}

	Blog
		.findByIdAndDelete(id)
		.then(deletedData => {
			res.status(204).json(deletedData)
		})
		.catch(error => next(error))
})

module.exports = blogsRouter
