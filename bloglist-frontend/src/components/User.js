import { useSelector } from 'react-redux'


const User = ({ user }) => {
  const usersBlogs = useSelector((state) =>
    state.blogs.filter((b) => b.user.username === user.username)
  )
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {usersBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User