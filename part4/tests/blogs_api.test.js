const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog.js')
const app = require('../app')
const helper = require('../tests/test_helper.js')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({}).then((deletion) => {
		console.log('deleted: ', deletion)
	})
	const initialBlogs = helper.initBlogs
		.map(blog => new Blog(blog))
	const promiseArray = initialBlogs.map(blog => blog.save())
	await Promise.all(promiseArray)
})

test('verify that the response is in JSON', async () => {
	await api
		.get('/api/blogs/')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('test that the identifier is name id', async () => {
	const res = await api.get('/api/blogs/')
	res.body.forEach(blog => {
		assert.ok(blog.id !== undefined, 'ID is undefined.')
	})
})

test('test that creating a new message with POST works', async () => {
	let res = await api.get('/api/blogs/')

	const nrOfBLogsBeginning = res.body.length
	const newObj = {
		title: "Tietokoneet",
		author: "Tepi",
		url: "www.tietokoneet.fi",
		likes: 19
	}

	await api
		.post('/api/blogs/')
		.send(newObj)
		.expect(201)
		.then(() => {
			console.log('Added newObject')
		})
	res = await api.get('/api/blogs/')
	const nrOfBLogsEnd = res.body.length
	console.log('items in beginning: ', nrOfBLogsBeginning, ' |end: ', nrOfBLogsEnd)
	assert.ok(nrOfBLogsEnd - nrOfBLogsBeginning === 1, 'inserting a new object should increment the amount of objects by 1')

	const latestBlog = await helper.getLatest()
	assert.ok(latestBlog.title === newObj.title)
	assert.ok(latestBlog.author === newObj.author)
	assert.ok(latestBlog.url === newObj.url)
	assert.ok(latestBlog.likes === newObj.likes)
})

test('test that a missing likes default to 0', async () => {
	const res = await api.get('/api/blogs/')
	res.body.forEach(x => {
		if (x.title === 'koneet'){
			assert.ok(x.likes === 0, 'Likes should default to 0')
		}
	})
})

test('test that missing title or url generates 404', async () => {
	const newObject = {
		author: "Kermit",
		url: "www.www.fi",
		likes: "2"
	}

	await api
		.post('/api/blogs/')
		.send(newObject)
		.expect(404)
		.then(() => {
			console.log('Got 404')
		})

})

test.only('test that a single blogpost is deleted', async () => {
	const newObject = {
		title: "Mikkis DELETION website",
		author: "Mikki",
		url: "www.mikki.fi",
		likes: 23
	}

	await api
		.post('/api/blogs/')
		.send(newObject)
		.expect(201)
		.then(() => {
			console.log('Added newObject for deletion test')
		})

	res = await api.get('/api/blogs')
	lenWithBlog = res.body.length

	res.body.forEach(x => {
		if(x.author === 'Mikki'){
			idToBeDeleted = x.id
		}
	})

	await api
		.delete(`/api/blogs/${idToBeDeleted}`)
		.expect(204)
		.then(() => {
			console.log('Deleted single blog post.')
		})

	res = await api.get('/api/blogs')
	lenAfterDeletion = res.body.length

	assert.ok(lenAfterDeletion === lenWithBlog - 1, 'Deleting single blog entry.')
})

after(async () => {
	mongoose.connection.close()
})
