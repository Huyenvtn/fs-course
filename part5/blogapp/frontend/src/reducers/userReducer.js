import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    }
  }
})

export const initializeUser = () => {
  return async dispatch => {
    const userFromStorage = await userService.getUser()
    if (userFromStorage) {
      dispatch(setUser(userFromStorage))
    }
  }
}

export const setSignedInUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username,
      password
    })
    userService.setUser(user)
    dispatch(setUser(user))
  }
}

export const removeSignedInUser = () => {
  return async dispatch => {
    userService.clearUser()
    dispatch(removeUser())
  }
}

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
