import { useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Blog from './components/Blog'
import User from './components/User'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import _ from 'lodash'

/* const User = ({ user }) => {
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
 */
/* const Users = ({ users }) => {
  return (
    users && (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.noOfBlogs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  )
} */

const App = () => {
  const loggedUser = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  const users = useSelector((state) => {
    let usersList = []
    for (const b of state.blogs) {
      let user = b.user
      let index = _.findIndex(usersList, { username: user.username })
      if (index > 0) {
        usersList[index].noOfBlogs++
      } else {
        usersList.push({ ...user, noOfBlogs: 1 })
      }
    }

    return usersList
  })

  const blogs = useSelector((state) => state.blogs)

  const userById = (id) => {
    let foundUser = users.find((u) => u.id === id)
    return foundUser
  }

  const blogById = (id) => blogs.find((b) => b.id === id)

  const user = userMatch ? userById(userMatch.params.id) : null
  const blog = blogMatch ? blogById(blogMatch.params.id) : null

  if (loggedUser === null) {
    return <LoginForm />
  }

  return (
    <div>
      <Menu />
      <h2>blogs</h2>
      <Notification />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      </Routes>
    </div>
  )
}

export default App
