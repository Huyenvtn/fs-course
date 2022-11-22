import { useState, useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'
import loginService from './services/login'

import { showNotification } from './reducers/notificationReducer'

const App = props => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
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
      props.showNotification('login successful', 5000)
    } catch (exception) {
      props.showNotification('Wrong username or password', 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const blogFormRef = useRef()

  return (
    <div>
      <h1>blogs</h1>
      {props.notification !== null && (
        <Notification message={props.notification} classes='success' />
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
            <BlogForm />
          </Togglable>
        </div>
      )}
      <BlogList />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
