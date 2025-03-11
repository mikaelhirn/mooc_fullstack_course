const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog.js')
const app = require('../app')
const helper = require('../tests/test_helper.js')

const api = supertest(app)

beforeEach(async () => {
	Blog.deleteMany({})
	const initialBlogs = helper.initBlogs
		.map(blog => new Blog(blog))
	const promiseArray = initialBlogs.map(blog => blog.save())
	await Promise.all(promiseArray)
})

test('verify that the tesponse is in JSON', async () => {
	await api
		.get('/api/blogs/')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test.only('test that the identifier is name id', async () => {
	const res = await api.get('/api/blogs/')
	res.body.forEach(blog => {
		assert.ok(blog.id !== undefined, 'ID is undefined.')
	})
})

after(async () => {
	mongoose.connection.close()
})
