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
		title: newObject.title,
		author: newObject.author,
		url: newObject.url,
		auth: token
	}
  const res = await axios.post(baseUrl, newBlog)
  return res.data
}

const addLike = async blog => {
	blog.likes = blog.likes + 1
	const url = `${baseUrl}/${blog.id}`
	const req = await axios.put(url, blog)
	return req
}

const update = (id, newObject) => {
  const req = axios.put(`${ baseUrl }/${id}`, newObject)
  return req.then(res => res.data)
}

export default { getAll, setToken, addLike, create, update }
