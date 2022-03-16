import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
const Menu = () => {
  const padding = {
    paddingRight: 5,
  }

  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser())
  }

  const loggedInUser = useSelector((state) => state.user.username)
  return (
    <div>
      <Link to="/blogs" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {loggedInUser} logged in{' '}
      <button id="logout-button" type="submit" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default Menu
