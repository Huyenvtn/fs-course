import { useDispatch } from "react-redux"
import { inputSearch } from '../reducers/filterReducer'

const FilterAnecdote = (props) => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const searchText = event.target.value
        dispatch(inputSearch(searchText))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default FilterAnecdote
