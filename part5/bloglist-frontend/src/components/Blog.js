import { useEffect, useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, handleShow }) => {
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
  const [show, setShow] = useState(false)
  useEffect(() => {
  }, [show])
  const handleChangeShow = (event) => {
    event.preventDefault()
    setShow(handleShow(show))
  }

  const handleUpdateLike = (event) => {
    event.preventDefault()
    const blogObject = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    likeBlog(blog.id, blogObject)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm('Do you really want to delete?')) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {show ?
        <div>
          <div>{blog.title} <button type="submit" onClick={handleChangeShow}>hide</button></div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button type="submit" onClick={handleUpdateLike}>like</button></div>
          <div>{blog.author}</div>
          <button style={removeStyle} type="submit" onClick={handleDelete}>remove</button>
        </div> :
        <div>{blog.title} {blog.author} <button type="submit" onClick={handleChangeShow}>view</button>
        </div>
      }
    </div>
  )
}

export default Blog