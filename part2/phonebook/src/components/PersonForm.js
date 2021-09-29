import React from  'react'

const PersonForm = (props) => {
    const { name, number, handleNameChange, handleNumberChange, addContact } = props
    return (
        <div>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={name} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={number} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm