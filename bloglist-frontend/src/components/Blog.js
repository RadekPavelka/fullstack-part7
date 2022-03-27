import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { createComment } from '../reducers/blogsReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.user.username)

  const incrementLikes = () => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
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
        <Button className="like-button" onClick={incrementLikes}>
          like
        </Button>
      </div>
      <div>added by {blog.user.username}</div>
      {loggedInUser === blog.user.username && (
        <Button variant="danger" className="remove-button" onClick={removeBlog}>
          remove
        </Button>
      )}
      <div>
        <h3>Comments</h3>
        <Form onSubmit={addComment}>
          <Form.Group as={Row}>
            <Col xs="auto">
              <Form.Control id="comment-input" type="text" name="comment" />
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-primary"
                id="comment-button"
                type="submit"
              >
                add comment
              </Button>
            </Col>
          </Form.Group>
        </Form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={Math.random(1000)}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
