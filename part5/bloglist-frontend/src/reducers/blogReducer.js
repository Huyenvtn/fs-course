import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const id = action.payload
      const blogToChange = state.find(item => item.id === id)
      const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
      return state.map(blog => (blog.id !== id ? blog : changedBlog))
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = blogObject => {
  return async dispatch => {
    const newNote = await blogService.create(blogObject)
    dispatch(appendBlog(newNote))
  }
}

export const likeBlog = id => {
  return async dispatch => {
    await blogService.update(id)
    dispatch(updateBlog(id))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.deleteItem(id)
    dispatch(deleteBlog(id))
  }
}

export const { appendBlog, setBlogs, updateBlog, deleteBlog } =
  blogReducer.actions

export default blogReducer.reducer
