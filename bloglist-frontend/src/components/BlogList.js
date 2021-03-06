import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { LinkContainer } from 'react-router-bootstrap'
import { ListGroup } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((b1, b2) => b2.likes - b1.likes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  /*   const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
 */
  const blogFormRef = useRef()

  const TogglableBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  if (!sortedBlogs) {
    return null
  }

  return (
    <div>
      <TogglableBlogForm />
      <ListGroup>
        {sortedBlogs.map((blog) => (
          <LinkContainer to={`/blogs/${blog.id}`} key={blog.id}>
            <ListGroup.Item action>
              {blog.title} {blog.author}
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </ListGroup>
    </div>
  )
}

export default BlogList
