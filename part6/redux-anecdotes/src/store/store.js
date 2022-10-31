import { configureStore } from '@reduxjs/toolkit'
import anecDoteSlice from '../reducers/anecdoteReducer'
import notificationSlice from '../reducers/notificationReducer'
import filterSlice from '../reducers/filterReducer'

const store = configureStore({
    reducer: {
        anecdotes : anecDoteSlice,
        notification: notificationSlice,
        filter: filterSlice
    }
})

export default store