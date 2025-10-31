import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './style.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState({})
  const [author, setAuthor] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
	if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
	  setUser(user)
	  blogService.setToken(user.token)
	}
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

	  try{
        const user = await loginService.login({ author, password })
		window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
		blogService.setToken(user.token)
		setUser(user)
		setAuthor('')
		setPassword('')
	  } catch (error) {
		console.log(error)
		  setNotificationMessage({ "msg": 'Wrong credentials', "type": 'error' })
		setTimeout(() => {
          setNotificationMessage(null)
		}, 5000)
	  }
  }

  const handleCreateNew = async event => {
    event.preventDefault()

	  try{
        const newBlog = await blogService.create({ newAuthor, newTitle, newUrl })
		setBlogs(blogs.concat({ title: newTitle, author: newAuthor, id: newBlog.id }))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        setNotificationMessage({ "msg": 'New blog added!', "type": 'ok' })
		setTimeout(() => {
          setNotificationMessage(null)
		}, 5000)
	  } catch (error) {
		console.log(error)
        setNotificationMessage({ "msg": 'Unable to create blog.', "type": 'error' })
		setTimeout(() => {
          setNotificationMessage(null)
		}, 5000)
	  }
  }

  const handleLogout = async event => {
	event.preventDefault()

	  try{
        window.localStorage.clear()
		setUser(null)
	  } catch ( error ) {
		console.log(error)
		setNotificationMessage('unable to logout')
	  }
  }

  if (user === null) {
	  return (
		<div>
			<h2>Login to view blogs</h2>
		    <Notification notification={notificationMessage} />
			<form onSubmit={handleLogin}>
				<div>
					<label>
						Name
						<input 
							type="text"
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						Password
						<input 
							type="password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
					</label>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	  )
  }
  return (
    <div>
      <h2>blogs</h2>
		<Notification notification={notificationMessage} />
		<p>{user.author} is logged in. <button name='Logout' onClick={handleLogout}>Logout</button></p>
		  <h2>create new blog entry</h2>
			<form onSubmit={handleCreateNew}>
				<div>
					<label>
					  title
						<input
							type="text"
							value={newTitle}
							onChange={({ target }) => setNewTitle(target.value)}
						/>
					</label>
				</div>
				<div>
				<div>
					<label>
					  author
						<input
							type="text"
							value={newAuthor}
							onChange={({ target }) => setNewAuthor(target.value)}
						/>
					</label>
				</div>
					<label>
					  url
						<input
							type="text"
							value={newUrl}
							onChange={({ target }) => setNewUrl(target.value)}
						/>
					</label>
				</div>
				<button type="submit">Create</button>
			</form>
		<br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App
