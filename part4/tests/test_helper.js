const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '633cf552e5b21ec48c218370',
  },
  {
    title: 'Go To Statement Considered',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    user: '633cf552e5b21ec48c218370',
  },
]

const initialUsers = [
  {
    username: 'dijkstra',
    name: 'Edsger W. Dijkstra',
    password: '$2a$10$/..ukVLrm4Gx2rttK0uEu.o5kXCef62aHICFR0uzEWhI63GpMlO8e',
    // "password": "Edsger",
  },
  {
    username: 'Statement',
    name: 'Statement Considered',
    password: '$2a$10$QTwT4xKvJv3h7dl1WOUgzOnPy.0p2EhUwccpcrKoMUyhFx6.rnZri',
    // "password": "Considered",
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
}
