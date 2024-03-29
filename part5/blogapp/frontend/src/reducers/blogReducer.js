import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    changeLikesBlog(state, action) {
      const id = action.payload
      const blogToChange = state.find(item => item.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: (blogToChange.likes || 0) + 1
      }
      return state
        .map(blog => (blog.id !== id ? blog : changedBlog))
        .sort(byLikes)
    },
    addCommentToBlog(state, action) {
      const id = action.payload.id

      const blogToChange = state.find(item => item.id === id)

      const changedBlog = {
        ...blogToChange,
        comments: blogToChange.comments
          ? blogToChange.comments.concat(action.payload.commentObject)
          : [action.payload.commentObject]
      }
      return state
        .map(blog => (blog.id !== id ? blog : changedBlog))
        .sort(byLikes)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id).sort(byLikes)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort(byLikes)))
  }
}

export const addBlog = blogObject => {
  return async dispatch => {
    const newNote = await blogService.create(blogObject)
    dispatch(appendBlog(newNote))
  }
}

export const updateLikeBlog = (id, updatedBlog) => {
  return async dispatch => {
    await blogService.update(id, updatedBlog)
    dispatch(changeLikesBlog(id))
  }
}

export const updateCommentsBlog = (id, commentObject) => {
  return async dispatch => {
    await blogService.addComment(id, commentObject)
    dispatch(addCommentToBlog({ id, commentObject }))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const {
  setBlogs,
  appendBlog,
  changeLikesBlog,
  removeBlog,
  addCommentToBlog
} = blogSlice.actions

export default blogSlice.reducer
