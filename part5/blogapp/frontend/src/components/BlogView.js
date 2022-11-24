const BlogView = ({ blog, likeBlog }) => {
  if (!blog) {
    return null
  }
  return (
    <div>
      <h3>{blog.title}</h3>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      <div>added by {blog.author}</div>
    </div>
  )
}

export default BlogView
