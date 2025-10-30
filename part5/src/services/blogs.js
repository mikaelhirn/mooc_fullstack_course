import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { auth: token  }
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = (id, newObject) => {
  const req = axios.put(`${ baseUrl }/${id}`, newObject)
  return req.then(res => res.data)
}

export default { getAll, setToken, create, update }
