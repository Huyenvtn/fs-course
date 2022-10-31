import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        try {
            dispatch(createAnecdote(content))
            dispatch(showNotification('you created "' + content + '"'))
            setTimeout(() => {
                dispatch(showNotification(null))
            }, 5000)
        } catch (e) {
            dispatch(showNotification('error'))
            setTimeout(() => {
                dispatch(showNotification(null))
            }, 5000)
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm