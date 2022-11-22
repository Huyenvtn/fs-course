const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1
  })

  response.json(blog)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  if (!title || !url) {
    return response.status(400).end()
  }
  const user = request.user
    ? request.user
    : window.localStorage.getItem('loggedUser')
  console.log(user)
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user.id
  })
  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  const user = request.user
  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user.id
  }
  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  }).populate('user', { username: 1, name: 1 })

  response.json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  const creatorId = blog.user ? blog.user.toString() : ''

  if (user.id.toString() !== creatorId) {
    return response.status(401).json({ error: 'user do not have permission' })
  }
  await Blog.findByIdAndRemove(request.params.id)

  return response.status(204).end()
})

module.exports = blogRouter
