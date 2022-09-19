const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.URI)
.then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/blogs', blogRouter)

module.exports = app