import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogsReducer'
import { createNotification } from '../reducers/notificationReducer'

const CommentForm = ({ commentedBlog }) => {
  const dispatch = useDispatch()
  console.log('blog in COmmentForm ', commentedBlog)

  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    //const newBlog = { title, author, url }
    //console.log('newBlog in addBlog', newBlog)
    dispatch(createComment(commentedBlog, comment))
    dispatch(
      createNotification({ text: 'Your comment was added', type: 'info' }, 3)
    )
  }

  return (
    <div className="formDiv">
      <form onSubmit={addComment}>
        <input type="text" id="coment-input" name="comment" />
        <button id="comment-button" type="submit">
          add comment
        </button>
      </form>
    </div>
  )
}

export default CommentForm
