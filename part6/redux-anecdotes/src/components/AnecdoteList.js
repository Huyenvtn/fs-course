import { useSelector, useDispatch } from 'react-redux'
import { toggleVoteOf } from '../reducers/anecdoteReducer'
const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.sort((first, second) => second.votes - first.votes))
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(toggleVoteOf(id))
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