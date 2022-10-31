import { useSelector, useDispatch } from 'react-redux'
import { toggleVoteOf } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
const AnecdoteList = (props) => {
    const searchText = useSelector(state => state.filter)
    const anecdotesList = useSelector(state => state.anecdotes.slice())
    const anecdotes = (searchText === null) ? anecdotesList.sort((first, second) => second.votes - first.votes)
                        : anecdotesList.filter(item => item.content.toLowerCase().includes(searchText.toLowerCase())).sort((first, second) => second.votes - first.votes)
    const dispatch = useDispatch()

    const vote = (id) => {
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        try {
            dispatch(toggleVoteOf(id))
            dispatch(showNotification('you voted "' + anecdote.content + '"'))
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
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList