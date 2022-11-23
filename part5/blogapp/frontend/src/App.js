import { connect } from 'react-redux'
import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

import { showNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  setBlogs,
  addBlog,
  deleteBlog
} from './reducers/blogReducer'

const App = props => {
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      setUser(userFromStorage)
    }
  }, [])

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password
      })
      .then(user => {
        setUser(user)
        userService.setUser(user)
        notify(`${user.name} logged in!`)
      })
      .catch(() => {
        notify('wrong username/password', 'alert')
      })
  }

  const logout = () => {
    setUser(null)
    userService.clearUser()
    notify('good bye!')
  }

  const createBlog = async blog => {
    try {
      props.addBlog(blog)
      notify(`a new blog '${blog.title}' by ${blog.author} added`)
      blogFormRef.current.toggleVisibility()
    } catch (e) {
      notify('creating a blog failed: ' + e.response.data.error, 'alert')
    }
  }

  const removeBlog = id => {
    const toRemove = props.blogs.find(b => b.id === id)

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) {
      return
    }
    props.deleteBlog(id)
  }

  const likeBlog = async id => {
    const toLike = props.blogs.find(b => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id
    }

    blogService.update(liked.id, liked).then(updatedBlog => {
      notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`)
      const updatedBlogs = props.blogs
        .map(b => (b.id === id ? updatedBlog : b))
        .sort(byLikes)
      props.setBlogs(updatedBlogs)
    })
  }

  const notify = (message, type = 'info') => {
    props.showNotification({ message, type }, 5000)
  }

  if (user === null) {
    return (
      <>
        <Notification notification={props.notification} />
        <LoginForm onLogin={login} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={props.notification} />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>

      <div id='blogs'>
        {props.blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs
  }
}
const mapDispatchToProps = {
  showNotification,
  setBlogs,
  initializeBlogs,
  addBlog,
  deleteBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
