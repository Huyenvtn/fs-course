const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
