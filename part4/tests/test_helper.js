const Blog = require('../models/blog.js')

const initBlogs = [
	{
		title: "Autot",
		author: "MAsa",
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
	}
]

const getLatest = async () => {
	const latest = await Blog
		.findOne()
		.sort({ _id: -1 })
	return latest
}

module.exports = {
	initBlogs, getLatest
}
