import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [author, setAuthor] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
        setErrorMessage('wrong credentials')
		setTimeout(() => {
          setErrorMessage(null)
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
		setErrorMessage('unable to logout')
	  }
  }

  if (user === null) {
	  return (
		<div>
			<h2>Login to view blogs</h2>
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
			{errorMessage}
		</div>
	  )
  }
  return (
    <div>
      <h2>blogs</h2>
		<p>{user.author} is logged in. <button name='Logout' onClick={handleLogout}>LOGOUT</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App
