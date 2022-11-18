import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'
import loginService from './services/login'

import { showNotification } from './reducers/notificationReducer'

const App = () => {
  const message = useSelector(state => state.notification)
  const dispatch = useDispatch()
  // const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
    // const fetchData = async () => {
    //   const data = await blogService.getAll()
    //   setBlogs(data)
    // }
    // fetchData()
  }, [dispatch])

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
    } catch (exception) {
      showNotification('Wrong username or password', 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      // const result = await blogService.create(blogObject)
      // const blogs = await blogService.getAll()
      // setBlogs(blogs)
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
      <BlogList />
      {/* <ul>
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            handleShow={handleShow}
          />
        ))}
      </ul> */}
    </div>
  )
}

export default App
