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

module.exports = {
	initBlogs, getLatest
}
