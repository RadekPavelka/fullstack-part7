import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then((response) => response.data)
}

const addComment = (blogId, newComment) => {
  const request = axios.post(`${baseUrl}/${blogId}/comments`, {
    comment: newComment,
  })
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default { get, getAll, create, setToken, update, remove, addComment }
