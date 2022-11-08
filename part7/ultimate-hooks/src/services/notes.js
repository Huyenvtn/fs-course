import axios from 'axios'
// const baseUrl = '/api/notes'
const baseURL = 'http://localhost:3005'

let token = null

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }


// const getAll = async () => {
//   const response = await axios.get(baseUrl)
//   return response.data
// }
const getData = async (url) => {
    const response = await axios.get(url)
    return response.data
}

const getPersons = async () => {
    const response = await axios.get(`${baseURL}/persons`)
    return response.data
}

const getNotes = async () => {
    const response = await axios.get(`${baseURL}/notes`)
    return response.data
}

const createPerson = async newObject => {

    const response = await axios.post(`${baseURL}/persons`, newObject)
    return response.data
}

const createNote = async newObject => {
    // console.log(newObject)
    // try {
        const response = await axios.post(`${baseURL}/notes`, newObject)
        
    console.log(response)
    return response.data
    // }
    // catch (e) {
        // console.log(e)
    // }
}


// const create = async newObject => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.post(baseUrl, newObject, config)
//   return response.data
// }

// const update = async (id, newObject) => {
//   const response = await axios.put(`${ baseUrl }/${id}`, newObject)
//   return response.data
// }

export default { getData, getNotes, getPersons, createNote, createPerson }