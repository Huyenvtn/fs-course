import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const handleAdd = async event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleAdd}>
        <div>
          title:
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={handleTitleChange}></input>
        </div>
        <div>
          author:
          <input
            type='text'
            name='author'
            id='author'
            value={author}
            onChange={handleAuthorChange}></input>
        </div>
        <div>
          url:
          <input
            type='text'
            name='url'
            id='url'
            value={url}
            onChange={handleUrlChange}></input>
        </div>
        <button type='submit' id='create-button'>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
