const { test, after, beforeEach  } = require('node:test')
const Note = require('../models/note')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialNotes = [
	{ content: 'HTML is easy', important: false, },
	{ content: 'Browser can execute only JavaScript', important: true, },
]

beforeEach(async () => {
	await Note.deleteMany({})

	let noteObject = new Note(helper.initialNotes[0])
	await noteObject.save()

	noteObject = new Note(helper.initialNotes[1])
	await noteObject.save()
})

test('notes are returned as json', async () => {
	await api
		.get('/api/notes/')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
	const res = await api.get('/api/notes')

	assert.strictEqual(res.body.length, helper.initialNotes.length)
})

test('a specific note is withing the returned notes', async () => {
	const res = await api.get('/api/notes/')

	const contents = res.body.map(e => e.content)
	assert(contents.includes('Browser can execute only JavaScript'))
})

test('a valid note can be added ', async () => {
	const newNote = {
		content: 'async/await simplifies making async calls',
		important: true
	}

	await api
		.post('/api/notes')
		.send(newNote)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const notesAtEnd = await helper.notesInDb()
	assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

	const contents = notesAtEnd.map(n => n.content)
	assert(contents.includes('async/await simplifies making async calls'))
})

test.only('a specific note can be viewed', async () => {
	const notesAtStart = await helper.notesInDb()
	const noteToView = notesAtStart[0]

	const resultNote = await api
		.get(`/api/notes/${noteToView.id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	console.log('--------------', noteToView)

	assert.deepStrictEqual(resultNote.body, noteToView)
})

test('a note can be deleted', async () => {
	const notesAtStart = await helper.notesInDb()
	const noteToDelete = notesAtStart[0]

	await api
		.delete(`/api/notes/${noteToDelete.id}`)
		.expect(204)

	const notesAtEnd = await helper.notesInDb()

	const contents = notesAtEnd.map(r => r.content)
	assert(!contents.includes(noteToDelete.content))

	assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})

test('note without content is not added', async () => {
	const newNote = {
		important: true
	}

	await api
		.post('/api/notes')
		.send(newNote)
		.expect(400)

	const notesAtEnd = await helper.notesInDb()

	assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

after(async () => {
	await mongoose.connection.close()
})
