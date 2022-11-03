import { connect } from "react-redux"
import { inputSearch } from '../reducers/filterReducer'

const FilterAnecdote = (props) => {

    const handleChange = (event) => {
        event.preventDefault()
        const searchText = event.target.value
        props.inputSearch(searchText)
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

const mapDispatchToProps = {
  inputSearch,
}
  
export default connect(
  null,
  mapDispatchToProps
)(FilterAnecdote)
