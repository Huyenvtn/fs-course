import React from 'react'

const Filter = props => {
  const { search, handleFilter } = props
  return (
    <div>
      filter shown with <input value={search} onChange={handleFilter} />
    </div>
  )
}

export default Filter
