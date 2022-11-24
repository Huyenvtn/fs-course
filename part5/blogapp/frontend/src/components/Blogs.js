import Blog from './Blog'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
const Blogs = ({
  blogs,
  likeBlog,
  removeBlog,
  user,
  blogFormRef,
  createBlog
}) => {
  return (
    <div>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default Blogs
