const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const tokenExtractor = require('../utils/middleware').tokenExtractor

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  response.json(users)
})

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  response.json(user)
})

userRouter.post('/', tokenExtractor, async (request, response) => {
  const { username, password, name, blogs } = request.body

  const existingUser = await User.findOne({ username: username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    })
  }

  if (!username || !password || username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'error invalid with username & password',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const newUser = new User({
    username: username,
    password: passwordHash,
    name: name,
    blogs: blogs,
  })
  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

userRouter.put('/:id', tokenExtractor, async (request, response) => {
  const { username, password, name } = request.body

  const newUser = {
    username: username,
    password: password,
    name: name,
  }
  const savedUser = await User.findByIdAndUpdate(request.params.id, newUser, {
    new: true,
  }).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(savedUser)
})

userRouter.delete('/:id', tokenExtractor, async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = userRouter
