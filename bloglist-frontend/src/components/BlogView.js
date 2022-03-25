import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { createComment } from '../reducers/blogsReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const BlogView = ({ blog }) => {
  console.log('blog in BlogView', blog)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.user.username)
  console.log('loggedInUSer', loggedInUser)

  const incrementLikes = () => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      console.log(blog)
      dispatch(deleteBlog(blog))
      dispatch(
        createNotification(
          {
            text: `Blog ${blog.title} by ${blog.author} was removed!`,
            type: 'info',
          },
          3
        )
      )
      navigate('/')
    }
  }

  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(createComment(blog, comment))
    dispatch(
      createNotification({ text: 'Your comment was added', type: 'info' }, 3)
    )
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
      {loggedInUser === blog.user.username && (
        <button className="remove-button" onClick={removeBlog}>
          remove
        </button>
      )}
      <div>
        <h3>Comments</h3>
        <form onSubmit={addComment}>
          <input type="text" id="coment-input" name="comment" />
          <button id="comment-button" type="submit">
            add comment
          </button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={Math.random(1000)}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogView
