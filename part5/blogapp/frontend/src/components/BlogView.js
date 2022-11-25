import { /*useEffect,*/ useState } from 'react'
import { connect } from 'react-redux'

import { showNotification } from '../reducers/notificationReducer'
import { updateCommentsBlog, initializeBlogs } from '../reducers/blogReducer'

const BlogView = props => {
  const [comment, setComment] = useState('')
  if (!props.blog) {
    return null
  }
  const addComment = event => {
    event.preventDefault()
    try {
      const obj = {
        body: comment
      }
      setComment('')
      props.updateCommentsBlog(props.blog.id, obj)
      props.initializeBlogs()
      props.showNotification(
        {
          message: 'A comment has added !',
          type: 'info'
        },
        5000
      )
    } catch (e) {
      props.showNotification(
        {
          message: 'Failed to add a comment !',
          type: 'alert'
        },
        5000
      )
    }
  }

  // useEffect(() => {
  //   initializeBlogs()
  // })

  return (
    <div>
      <h2>{props.blog.title}</h2>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>
        {props.blog.likes} likes{' '}
        <button onClick={() => props.likeBlog(props.blog.id)}>like</button>
      </div>
      <div>added by {props.blog.user ? props.blog.user.name : 'anonymous'}</div>
      <div>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id='comment'
            placeholder="haven't read this yet..."
          />
          <button type='submit'>add comment</button>
        </form>

        <ul>
          {props.blog.comments &&
            props.blog.comments.map(comment => (
              <li key={comment.id}>{comment.body}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}
const mapDispatchToProps = {
  showNotification,
  updateCommentsBlog,
  initializeBlogs
}

export default connect(null, mapDispatchToProps)(BlogView)
