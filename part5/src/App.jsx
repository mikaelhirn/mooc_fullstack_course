import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Createblog from './components/Createblog'
import Blog from './components/Blog'
import Toggleview from './components/Toggleview'
import blogService from './services/blogs'
import loginService from './services/login'
import './style.css'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [notificationMessage, setNotificationMessage] = useState({})
	const [author, setAuthor] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [blogFormVisible, setBlogFormVisible] = useState(false)

	const blogFormRef = useRef()

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

	const handleCreateNew = (blogObject) => {
		try{
			blogService
				.create(blogObject)
				.then(returnedBlog => {
					setBlogs(blogs.concat({ title: returnedBlog.title, author: returnedBlog.author, url: returnedBlog.url, id: returnedBlog.id }))
				})
			blogFormRef.current.toggleVisibility()
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

	const handleLike = (blog) => {
		try {
			blogService
				.addLike(blog)
			setNotificationMessage({ "msg": 'Liked!', "type": 'ok' })
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		} catch (error) {
			console.log(error)
			setNotificationMessage({ "msg": 'Unable to add like.', "type": 'error' })
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
			<Notification notification={notificationMessage} />
			<Createblog ref= {blogFormRef} user={user} handleLogout={handleLogout} createBlog={handleCreateNew} notificationMessage={notificationMessage} setBlogFormVisible={setBlogFormVisible} blogFormVisible={blogFormVisible} />
			<br />
			{blogs.map(blog =>
				<Toggleview key={blog.id} blog={blog}>
					<Blog key={blog.id} blog={blog} handleLike={handleLike} />
				</Toggleview>
			)}
		</div>
	)
}


	export default App
