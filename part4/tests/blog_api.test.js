const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('viewing all blogs', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('with the unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  }, 100000)

})

describe('addition of a new blog', () => {
  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('succeeds with true total number of blogs', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
      'Go To Statement Considered Harmful'
    )
  })

  test('succeeds with likes property is missing', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
  })
})

describe('updating a specific blog', () => {
  test('succeeds with a valid likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updateBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 48
    }
    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.likes).toEqual(48)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})