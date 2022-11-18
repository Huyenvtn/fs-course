import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const result = await axios.get(baseUrl)

  console.log(result.data)
  return await result.data.sort(
    (firstItem, secondItem) => secondItem.likes - firstItem.likes
  )
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const update = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const item = await getById(id)
  // const blogObject = {
  //   user: blog.user,
  //   title: blog.title,
  //   author: blog.author,
  //   url: blog.url,
  //   likes: blog.likes + 1
  // }
  const newObject = {
    user: item.user,
    title: item.title,
    author: item.author,
    url: item.url,
    likes: item.likes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const deleteItem = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, setToken, create, update, deleteItem }
