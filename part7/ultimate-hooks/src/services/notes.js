import axios from 'axios'
const baseURL = 'http://localhost:3005'
let token = null

const getData = async url => {
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
  const response = await axios.post(`${baseURL}/notes`, newObject)
  return response.data
}

export default { getData, getNotes, getPersons, createNote, createPerson }
