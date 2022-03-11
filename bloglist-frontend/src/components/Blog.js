import React, { useState } from 'react'

const Blog = ({ blog, currentUser, likeBlog, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const incrementLikes = () => {
    likeBlog(blog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      {detailsVisible ? (
        <div>
          {blog.title} {blog.author}{' '}
          <button
            className="hide-button"
            onClick={toggleVisibility}
            type="button"
          >
            hide
          </button>{' '}
          <br />
          {blog.url}
          <br />
          likes: {blog.likes}{' '}
          <button
            className="like-button"
            onClick={incrementLikes}
            type="button"
          >
            like
          </button>{' '}
          <br />
          user: {blog.user.username} <br />
          {currentUser === blog.user.username && (
            <button className="remove-button" onClick={removeBlog}>
              remove
            </button>
          )}
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <button
            onClick={toggleVisibility}
            className="view-button"
            type="button"
          >
            view
          </button>
        </div>
      )}
    </div>
  )
}
export default Blog
