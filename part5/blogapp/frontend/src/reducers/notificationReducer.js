import { createSlice } from '@reduxjs/toolkit'

let timer
const notificationReducer = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      const content = action.payload
      return content
    }
  }
})

export const { setNotification } = notificationReducer.actions

export const showNotification = (notification, timeout) => {
  return dispatch => {
    if (timer) {
      clearTimeout(timer)
    }
    dispatch(setNotification(notification))
    timer = setTimeout(() => {
      dispatch(setNotification(null))
    }, timeout)
  }
}

export default notificationReducer.reducer
