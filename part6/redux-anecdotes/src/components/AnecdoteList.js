import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'
const AnecdoteList = props => {
  const vote = id => {
    const anecdote = props.anecdotes.find(anecdote => anecdote.id === id)
    try {
      props.voteAnecdote(id)
      props.setNotification('you voted "' + anecdote.content + '"', 5000)
    } catch (e) {
      props.setNotification('error', 5000)
    }
  }

  return (
    <div>
      {props.anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  if (state.filter === null) {
    return {
      anecdotes: state.anecdotes
        .slice()
        .sort((first, second) => second.votes - first.votes)
    }
  }
  return {
    anecdotes: state.anecdotes
      .slice()
      .filter(item =>
        item.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((first, second) => second.votes - first.votes)
  }
}

const mapDispatchToProps = {
  setNotification,
  voteAnecdote
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
