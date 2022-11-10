import { createSlice } from '@reduxjs/toolkit'

let timer
const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const content = action.payload
      return content
    }
  }
})

export const { showNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async dispatch => {
    if (timer) {
      clearTimeout(timer)
    }
    dispatch(showNotification(message))
    timer = setTimeout(() => {
      dispatch(showNotification(null))
    }, timeout)
  }
}

export default notificationSlice.reducer
