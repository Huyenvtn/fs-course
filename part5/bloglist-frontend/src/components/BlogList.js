import { connect } from 'react-redux'
import Blog from './Blog'

const BlogList = props => {
  const handleShow = show => {
    return !show
  }

  return (
    <div>
      <ul>
        {props.blogs.map(blog => (
          <Blog key={blog.id} blog={blog} handleShow={handleShow} />
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(BlogList)
