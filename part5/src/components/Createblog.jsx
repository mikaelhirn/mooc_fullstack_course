import Notification from './Notification'

const Createblog = ({
	handleLogout,
	handleCreateNew,
	blogFormVisible,
	setBlogFormVisible,
	notificationMessage,
	user,
	newTitle,
	newAuthor,
	newUrl,
	setNewTitle,
	setNewAuthor,
	setNewUrl
}) => {
	const hideWhenVisible = { display: blogFormVisible ? '' : 'none' }
	const showWhenVisible = { display: blogFormVisible ? 'none' : '' }

	if (blogFormVisible === true) {
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
						<label>
							author
							<input
								type="text"
								value={newAuthor}
								onChange={({ target }) => setNewAuthor(target.value)}
							/>
						</label>
					</div>
					<div>
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
				<div className={showWhenVisible}>
					<br /><button onClick={() => setBlogFormVisible(false)}>Hide form</button>
				</div>
			</div>
		)

	} else {
		return (
			<div>
				<h2>blogs</h2>
				<button onClick={() => setBlogFormVisible(true)}>Insert blog</button>
			</div>
		)
	}
}

export default Createblog
