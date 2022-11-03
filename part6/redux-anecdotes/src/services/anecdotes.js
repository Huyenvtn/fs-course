import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    console.log (response.data)
    return response.data
}

const createNew = async (content) => {
    const obj = {
        content: content,
        votes: 0
    }
    const response = await axios.post(baseURL, obj)
    return response.data
}

const getById = async (id) => {
    const response = await axios.get(`${baseURL}/${id}`)
    return response.data
}

const update = async (id) => {
    const item = await getById(id)
    const obj = {
        content: item.content,
        votes: item.votes + 1
    }
    const response = await axios.put(`${baseURL}/${id}`, obj)
    return response.data
}

// const deleteItem = async (id) => {
//   const response = await axios.delete(`${baseURL}/${id}`)
//   return response
// }

export default { getAll, createNew, getById, update}