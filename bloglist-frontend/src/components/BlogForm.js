import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { createNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const newBlog = { title, author, url }
    dispatch(createBlog(newBlog))
    dispatch(
      createNotification(
        { text: `A new blog ${title} by ${author} added`, type: 'info' },
        3
      )
    )
  }

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            id="title-input"
            name="title"
            placeholder="write the title of the blog"
          />
        </div>
        <div>
          author
          <input
            type="text"
            id="author-input"
            name="author"
            placeholder="write the author"
          />
        </div>
        <div>
          url
          <input
            type="text"
            id="url-input"
            name="url"
            placeholder="write blog's url"
          />
        </div>
        <Button id="create-button" type="submit">
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
