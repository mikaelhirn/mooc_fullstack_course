const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((acc, blog) => acc + blog.likes ,0)
}

const favoriteBlog = (blogs) => {
	const sorted = blogs.sort((a, b) => b.likes - a.likes)
	return {
		"title": sorted[0].title,
		"author": sorted[0].author,
		"likes": sorted[0].likes,
	}
}

const mostBlogs = (blogs) => {
	const grouped = _.groupBy(blogs, 'author')

	const blogCount = _.map(grouped, (blogs, author) => ({
		author,
		blogs: blogs.length
	}))

	return withMostBlogs = _.maxBy(blogCount, 'blogs')
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}
