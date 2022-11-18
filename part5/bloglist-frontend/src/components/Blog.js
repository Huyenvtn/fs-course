import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const Blog = props => {
  const blog = props.blog
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const removeStyle = {
    backgroundColor: 'blue',
    color: 'white'
  }
  const noneList = {
    listStyleType: 'none'
  }
  const [show, setShow] = useState(false)
  useEffect(() => {}, [show])
  const handleChangeShow = event => {
    event.preventDefault()
    setShow(!show)
  }

  const handleUpdateLike = event => {
    event.preventDefault()

    try {
      const result = props.likeBlog(blog.id)
      props.showNotification(
        `a blog ${result.title} by ${result.author} updated`,
        5000
      )
    } catch (error) {
      props.showNotification('create failed', 5000)
    }
  }

  const handleDelete = event => {
    event.preventDefault()
    if (window.confirm('Do you really want to delete?')) {
      try {
        props.removeBlog(blog.id)
        props.showNotification('deleting a blog successful', 5000)
      } catch (error) {
        props.showNotification('deleting a blog failed', 5000)
      }
    }
  }

  return (
    <div style={blogStyle}>
      {show ? (
        <li style={noneList}>
          <div>
            {blog.title}{' '}
            <button type='submit' onClick={handleChangeShow}>
              hide
            </button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button type='submit' onClick={handleUpdateLike}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          <button style={removeStyle} type='submit' onClick={handleDelete}>
            remove
          </button>
        </li>
      ) : (
        <li style={noneList}>
          {blog.title} {blog.author}{' '}
          <button type='submit' onClick={handleChangeShow}>
            view
          </button>
        </li>
      )}
    </div>
  )
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  showNotification
}

export default connect(null, mapDispatchToProps)(Blog)
