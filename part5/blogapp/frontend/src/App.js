import { connect } from 'react-redux'
import { useEffect, useRef } from 'react'
import { Container } from '@mui/material'
import { Route, Routes, useMatch } from 'react-router-dom'

// import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
// import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
// import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import Menu from './components/Menu'

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
import { initializeUsers } from './reducers/usersReducer'

const App = props => {
  const blogFormRef = useRef()

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
    props.initializeUser()
  }, [])
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

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
      user: toLike.user ? toLike.user.id : '',
      comments: toLike.comments.map(comment => comment.id)
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
    <Container>
      <Menu name={props.user.name} logout={logout} />
      <h2>blogs</h2>

      <Notification notification={props.notification} />

      {/* <div>
        <div>{props.user.name} logged in</div>
        <button onClick={logout}>logout</button>
      </div> */}

      <Routes>
        <Route
          path='/'
          element={
            <Blogs
              blogs={props.blogs}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              user={props.user}
              blogFormRef={blogFormRef}
              createBlog={createBlog}
            />
          }
        />
        <Route
          path='/blogs'
          element={
            <Blogs
              blogs={props.blogs}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              user={props.user}
              blogFormRef={blogFormRef}
              createBlog={createBlog}
            />
          }
        />
        <Route path='/users' element={<Users users={props.users} />} />
        <Route
          path='/users/:id'
          element={
            <User
              user={
                matchUser
                  ? props.users.find(item => item.id === matchUser.params.id)
                  : null
              }
            />
          }
        />
        <Route
          path='/blogs/:id'
          element={
            <BlogView
              likeBlog={likeBlog}
              blog={
                matchBlog
                  ? props.blogs.find(item => item.id === matchBlog.params.id)
                  : null
              }
            />
          }
        />
      </Routes>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user,
    users: state.users
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
  initializeUsers,
  removeSignedInUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
