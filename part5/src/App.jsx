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

  const handleLogin = async event => {
    event.preventDefault()

	  try{
        const user = await loginService.login({ author, password })
		setUser(user)
		setAuthor('')
		setPassword('')
	  } catch {
        setErrorMessage('wrong credentials')
		console.log('errrr')
		setTimeout(() => {
          setErrorMessage(null)
		  console.log('timeout...')
		}, 5000)
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
