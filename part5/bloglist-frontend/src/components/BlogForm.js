import { connect } from 'react-redux'
import { useField } from '../hooks'
import { addBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
const BlogForm = props => {
  const { clear: clearTitle, ...title } = useField('title')
  const { clear: clearAuthor, ...author } = useField('author')
  const { clear: clearUrl, ...url } = useField('url')

  const handleAdd = async event => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    try {
      const result = props.addBlog(blogObject)

      props.blogFormRef.current.toggleVisibility()
      props.showNotification(
        `a new blog ${result.title} by ${result.author} added`,
        5000
      )
      //  setMessageType('success')
    } catch (error) {
      props.showNotification('create failed', 5000)
      // setMessageType('error')
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
  addBlog,
  showNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)
