require('dotenv').config()

const PORT = process.env.PORT
const URI =
  process.env.NODE_ENV === 'test' ? process.env.TEST_URI : process.env.URI

module.exports = {
  PORT,
  URI
}
