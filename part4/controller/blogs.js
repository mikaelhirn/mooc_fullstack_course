const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
	Blog
		.find({})
		.then(blogs => {
			res.json(blogs)
		})
})

blogsRouter.post('/', (req, res, next) => {
	const blog = new Blog(req.body)
	console.log('blog: ', blog)
	if(blog.url == undefined || blog.title == undefined){
		res.status(404).end()
	}
	blog
		.save()
		.then(savedData => {
			res.status(201).json(savedData)
		})
		.catch(error => next(error))
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
	console.log(id)

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
