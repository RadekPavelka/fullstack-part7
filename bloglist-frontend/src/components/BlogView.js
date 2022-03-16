import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

const BlogView = ({ blog }) => {
  console.log('blog in BlogView', blog)

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.user.username)
  console.log('loggedInUSer', loggedInUser)

  const incrementLikes = () => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      console.log(blog)
      dispatch(deleteBlog(blog))
    }
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <button className="like-button" onClick={incrementLikes}>
          like
        </button>
      </div>
      <div>added by {blog.user.username}</div>
      {loggedInUser=== blog.user.username && (
        <button className="remove-button" onClick={removeBlog}>
          remove
        </button>
      )}
    </div>
  )
}

export default BlogView
