import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, loggedInUser }) => {

  const dispatch = useDispatch()

  const incrementLikes = () => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      console.log(blog)
      dispatch(deleteBlog(blog))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <br />
        {blog.url}
        <br />
        likes: {blog.likes}{' '}
        <button className="like-button" onClick={incrementLikes} type="button">
          like
        </button>{' '}
        <br />
        user: {blog.user.username} <br />
        {loggedInUser.username === blog.user.username && (
          <button className="remove-button" onClick={removeBlog}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}
export default Blog
