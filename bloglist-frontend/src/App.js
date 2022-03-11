import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      console.log(user.username)
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blog) => {
    blogService
      .create(blog)
      .then((newBlog) => {
        setBlogs(blogs.concat(newBlog))
        setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
        setTimeout(() => setMessage(), 3000)
      })
      .catch((error) => {
        setMessage(error.response.data.error)
        setTimeout(() => setMessage(), 3000)
      })
  }

  const likeBlog = (blog) => {
    console.log('blog ', blog)
    blogService
      .update(blog.id, { ...blog, likes: ++blog.likes, user: blog.user._id })
      .then((returnedBlog) => {
        console.log('returnedBlog ', returnedBlog)
        setBlogs(
          blogs.map((b) =>
            b.id !== blog.id ? b : { ...returnedBlog, user: blog.user }
          )
        )
      })
      .catch((error) => {
        console.log('Something went wrong, error: ', error)
      })
  }

  const removeBlog = (blogId) => {
    blogService
      .remove(blogId)
      .then(setBlogs(blogs.filter((b) => b.id !== blogId)))
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return <LoginForm message={message} loginUser={handleLogin} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{message}</p>
      <form onSubmit={handleLogout}>
        {user.username} logged in
        <button id="logout-button" type="submit">
          logout
        </button>
      </form>
      {blogForm()}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={removeBlog}
            currentUser={user.username}
          />
        ))}
    </div>
  )
}

export default App
