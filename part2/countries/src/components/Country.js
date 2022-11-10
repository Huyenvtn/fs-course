import React from 'react'

const Country = ({ name, handleClick }) => {
  return (
    <div>
      {name}{' '}
      <button value={name} onClick={handleClick}>
        show
      </button>
    </div>
  )
}

export default Country
