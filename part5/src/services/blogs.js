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
	const newBlog = {
		title: newObject.newTitle,
		author: newObject.newAuthor,
		url: newObject.newUrl,
		auth: token
	}
  const res = await axios.post(baseUrl, newBlog)
  return res.data
}

const update = (id, newObject) => {
  const req = axios.put(`${ baseUrl }/${id}`, newObject)
  return req.then(res => res.data)
}

export default { getAll, setToken, create, update }
