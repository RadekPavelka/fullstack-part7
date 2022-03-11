import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0,
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
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
            value={blogTitle}
            name="Title"
            onChange={(e) => setBlogTitle(e.target.value)}
            placeholder="write the title of the blog"
          />
        </div>
        <div>
          author
          <input
            type="text"
            id="author-input"
            value={blogAuthor}
            name="Author"
            onChange={(e) => setBlogAuthor(e.target.value)}
            placeholder="write the author"
          />
        </div>
        <div>
          url
          <input
            type="text"
            id="url-input"
            value={blogUrl}
            name="URL"
            onChange={(e) => setBlogUrl(e.target.value)}
            placeholder="write blog's url"
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
