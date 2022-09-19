const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const server = http.createServer(app)

server.listen(config.PORT || 3003, () => {
  logger.info(`Server running on port ${config.PORT}`)
})