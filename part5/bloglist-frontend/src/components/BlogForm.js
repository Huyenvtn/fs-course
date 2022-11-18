// import { useState } from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { addBlog } from '../reducers/blogReducer'
const BlogForm = props => {
  const { clear: clearTitle, ...title } = useField('title')
  const { clear: clearAuthor, ...author } = useField('author')
  const { clear: clearUrl, ...url } = useField('url')

  const handleAdd = async event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    props.addBlog(blogObject)
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

    clearTitle()
    clearAuthor()
    clearUrl()
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleAdd}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button type='submit' id='create-button'>
          create
        </button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addBlog
}

export default connect(null, mapDispatchToProps)(BlogForm)
