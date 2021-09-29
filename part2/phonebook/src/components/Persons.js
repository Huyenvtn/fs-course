import React from 'react'

const Persons = ({name, number, handleDelete}) => {
    return <div>{name} {number} <button onClick={handleDelete} value={name}>delete</button></div>
}

export default Persons