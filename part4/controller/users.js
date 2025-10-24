const bcrypt = require('bcrypt')
const usersRoute = require('express').Router()
const User = require('../models/user')

usersRoute.get('/', async (req, res) => {
	User
		.find({})
		.populate('blogs', {url: 1, title: 1, author: 1})
		.then(x => {
			res.status(201).json(x)
		})
})

usersRoute.post('/', async (req, res) => {
	const { author, name, password } = req.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User ({
		author,
		name,
		passwordHash,
	})

	const savedUser = await user.save()

	res.status(201).json(savedUser)
})

module.exports = usersRoute
