import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    inputSearch(state, action) {
      const searchText = action.payload
      return searchText
    }
  }
})

export const { inputSearch } = filterSlice.actions
export default filterSlice.reducer
