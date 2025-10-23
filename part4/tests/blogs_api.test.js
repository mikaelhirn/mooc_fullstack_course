const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
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

test('test that a single blogpost is deleted', async () => {
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

test('test that the amount of likes update', async () => {
	origRes = await api.get('/api/blogs')

	let id
	let newObject
	let origLikes

	origRes.body.forEach(x => {
		if(x.author === 'Masa'){
			newObject = x
			origLikes = x.likes
			newObject.likes = newObject.likes + 1
		}
	})
	await api
		.put(`/api/blogs/${newObject.id}`)
		.send(newObject)
		.expect(200)
		.then(() => {
			console.log(`Updated to ${newObject.likes} likes.`)
		})

	assert.ok(newObject.likes === origLikes + 1)
})

test.only('test username creation with a fresh name', async () => {
	await User.deleteMany({})

	const passwordHash = await bcrypt.hash('sala', 10)
	const user = new User({ username: 'root', name: 'root mc rooty', passwordHash })
	await user.save()

	const usersAtStart = await helper.usersInDb()
	console.log(`Users at start: ${usersAtStart}`)
	
	const newUser = {
		username: 'kike',
		name: 'Kike Elomaa',
		password: 'salainen'
	}

	await api
		.post('/api/users/')
		.send(newUser)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const usersAtEnd = await helper.usersInDb()

	assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
	console.log(`UAS: ${usersAtStart} UAE: ${usersAtEnd}`)

	const usernames = usersAtEnd.map(u => u.username)
	assert(usernames.includes(newUser.username))
})

after(async () => {
	mongoose.connection.close()
})
