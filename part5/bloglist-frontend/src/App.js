import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { showNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const message = useSelector(state => state.notification)
  // const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await blogService.getAll()
      setBlogs(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser !== null) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async obj => {
    try {
      const user = await loginService.login(obj)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      showNotification('login successful', 5000)
      // setMessage('login successful')
      setMessageType('success')
      // setTimeout(() => {
      //   setMessage(null)
      //   setMessageType(null)
      // }, 5000)
    } catch (exception) {
      showNotification('Wrong username or password', 5000)
      // setMessage('Wrong username or password')
      setMessageType('error')
      // setTimeout(() => {
      //   setMessage(null)
      //   setMessageType(null)
      // }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const result = await blogService.create(blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      showNotification(
        `a new blog ${result.title} by ${result.author} added`,
        5000
      )
      // setMessage(`a new blog ${result.title} by ${result.author} added`)
      setMessageType('success')
      // setTimeout(() => {
      //   setMessage(null)
      //   setMessageType(null)
      // }, 5000)
    } catch (error) {
      showNotification('create failed', 5000)
      // setMessage('create failed')
      setMessageType('error')
      // setTimeout(() => {
      //   setMessage(null)
      //   setMessageType(null)
      // }, 5000)
    }
  }
  const likeBlog = async (id, blogObject) => {
    try {
      const result = await blogService.update(id, blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      showNotification(
        `a blog ${result.title} by ${result.author} updated`,
        5000
      )
      // setMessage(`a blog ${result.title} by ${result.author} updated`)
      setMessageType('success')
      // setTimeout(() => {
      //   setMessage(null)
      //   setMessageType(null)
      // }, 5000)
    } catch (error) {
      showNotification('create failed', 5000)
      // setMessage('create failed')
      setMessageType('error')
      // setTimeout(() => {
      //   setMessage(null)
      //   setMessageType(null)
      // }, 5000)
    }
  }

  const deleteBlog = async id => {
    try {
      await blogService.deleteItem(id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      showNotification('deleting a blog successful', 5000)
      // setMessage('deleting a blog successful')
      setMessageType('success')
      // setTimeout(() => {
      //   setMessage(null)
      //   setMessageType(null)
      // }, 5000)
    } catch (error) {
      showNotification('deleting a blog failed', 5000)
      // setMessage('deleting a blog failed')
      setMessageType('error')
      // setTimeout(() => {
      //   setMessage(null)
      //   setMessageType(null)
      // }, 5000)
    }
  }

  const handleShow = show => {
    return !show
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h1>blogs</h1>
      {message !== null && (
        <Notification message={message} classes={messageType} />
      )}
      {user === null ? (
        <Togglable buttonLabel='Login now'>
          <LoginForm handleLogin={login} />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} logged-in{' '}
            <button type='submit' onClick={handleLogout}>
              logout
            </button>
          </p>
          <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <ul>
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            handleShow={handleShow}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
