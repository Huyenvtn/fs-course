import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendNote(state, action) {
      state.push(action.payload)
    }
  }
})

export const addNote = blogObject => {
  return async dispatch => {
    const newNote = await blogService.create(blogObject)
    dispatch(appendNote(newNote))
  }
}

export const { appendNote } = blogReducer.actions

export default blogReducer.reducer
