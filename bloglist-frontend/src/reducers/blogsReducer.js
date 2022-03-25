import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      console.log(updatedBlog)
      return state.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
    },
    removeBlog(state, action) {
      const removedBlog = action.payload
      return state.filter((b) => b.id !== removedBlog.id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(updateBlog(likedBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const blogToRemove = blog
    await blogService.remove(blogToRemove.id)
    dispatch(removeBlog(blogToRemove))
  }
}

export const createComment = (blog, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.addComment(blog.id, comment)
    dispatch(updateBlog(commentedBlog))
  }
}

export default blogsSlice.reducer
