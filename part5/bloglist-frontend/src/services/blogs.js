import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const result = await axios.get(baseUrl)

  console.log(result.data)
  return await result.data.sort((firstItem, secondItem) => firstItem.likes - secondItem.likes)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}` , newObject, config)
  return response.data
}

const deleteItem = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}` , config)
  return response
}

export default { getAll, setToken, create, update, deleteItem }