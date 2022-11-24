import { connect } from 'react-redux'
import { useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { showNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  setBlogs,
  addBlog,
  deleteBlog,
  updateLikeBlog
} from './reducers/blogReducer'
import {
  initializeUser,
  setSignedInUser,
  removeSignedInUser
} from './reducers/userReducer'

const App = props => {
  const blogFormRef = useRef()

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUser()
  }, [])

  const login = async (username, password) => {
    try {
      await props.setSignedInUser(username, password)
      notify(`${username} logged in!`)
    } catch (e) {
      notify('wrong username/password', 'alert')
    }
  }

  const logout = () => {
    props.removeSignedInUser()
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
      user: toLike.user ? toLike.user.id : ''
    }

    props.updateLikeBlog(liked.id, liked)
    notify(`you liked '${liked.title}' by ${liked.author}`)
  }

  const notify = (message, type = 'info') => {
    props.showNotification({ message, type }, 5000)
  }

  if (props.user === null) {
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
        {props.user.name} logged in
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
            user={props.user}
          />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user
  }
}
const mapDispatchToProps = {
  showNotification,
  setBlogs,
  initializeBlogs,
  addBlog,
  deleteBlog,
  updateLikeBlog,
  setSignedInUser,
  initializeUser,
  removeSignedInUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
