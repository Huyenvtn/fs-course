const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const errorHandler = (error, req, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    logger.error(error.message)
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(400).json({ error: 'token expired' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.header('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
    next()
  } else {
    return response.status(401).json({ error: 'token missing' })
  }
}

const userExtractor = async (request, response, next) => {
  const authorization = request.header('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const decodedToken = jwt.verify(
      authorization.substring(7),
      process.env.SECRET
    )
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    request.user = await User.findById(decodedToken.id)
    next()
  } else {
    return response.status(401).json({ error: 'token missing' })
  }
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}
