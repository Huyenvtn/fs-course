const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
  const user = {
    username: 'dijkstra',
    password: 'Edsger'
  }

  const response = await api.post('/api/login').send(user)
  token = response.body.token
})

describe('viewing all users', () => {
  test('all users are returned', async () => {
    const response = await api
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body).toHaveLength(helper.initialUsers.length)
  }, 100000)

  test('with the unique identifier property is username', async () => {
    const response = await api
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body[0].username).toBeDefined()
  }, 100000)
})

describe('addition of a new user', () => {
  test('fails with status code 400 if data invalid', async () => {
    const newUser = {
      username: 'dijkstrasai',
      name: 'Edsger W. Dijkstra'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('fails with status code 401 if token invalid', async () => {
    const newUser = {
      username: 'dijkstrane',
      name: 'Edsger W. Dijkstra',
      password: 'Edsger'
    }

    await api.post('/api/users').send(newUser).expect(401)
  })

  test('succeeds with true total number of users', async () => {
    const newUser = {
      username: 'dijkstrane',
      name: 'Edsger W. Dijkstra',
      password: 'Edsger'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map(r => r.username)
    expect(usernames).toContain('dijkstrane')
  })
})

describe('deletion of a user', () => {
  test('fails with status code 401 if token invalid', async () => {
    const usersAtStart = await helper.usersInDb()
    const userToDelete = usersAtStart[0]

    await api.delete(`/api/users/${userToDelete.id}`).expect(401)
  })
  test('succeeds with status code 204', async () => {
    const usersAtStart = await helper.usersInDb()
    const userToDelete = usersAtStart[0]

    await api
      .delete(`/api/users/${userToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length - 1)

    const usernames = usersAtEnd.map(r => r.username)
    expect(usernames).not.toContain(userToDelete.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
