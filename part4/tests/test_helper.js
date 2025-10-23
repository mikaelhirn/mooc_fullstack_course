const Blog = require('../models/blog.js')
const User = require('../models/user.js')

const initBlogs = [
	{
		title: "Autot",
		author: "Masa",
		url: "www.autot.org",
		likes: 4
	},
	{
		title: "mopot",
		author: "timppa",
		url: "www.mopot.org",
		likes: 6
	},
	{
		title: "fillarit",
		author: "timppa",
		url: "www.fillarit.org",
		likes: 9
	},
	{
		title: "koneet",
		author: "kim",
		url: "www.koneet.org"
	}
]

const getLatest = async () => {
	const latest = await Blog
		.find({})
	return latest
}

const usersInDb = async () => {
	const users = await User
		.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	initBlogs, getLatest, usersInDb
}
