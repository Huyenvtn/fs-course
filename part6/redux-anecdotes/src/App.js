import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import FilterAnecdote from './components/FilterAnecdote'

const App = () => {
  let message = useSelector(state => state.notification)
  return (
    <div>
      <h2>Anecdotes</h2>
      { message !== null && <Notification /> }
      <FilterAnecdote />
      <AnecdoteList />
      <AnecdoteForm />
      
    </div>
  )
}

export default App