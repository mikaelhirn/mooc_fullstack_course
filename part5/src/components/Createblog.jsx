import Notification from './Notification'
import { useState, useImperativeHandle } from 'react'

const Createblog = ({
    handleLogout,
    createBlog,
    notificationMessage,
    user,
    ref
}) => {
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [blogFormVisible, setBlogFormVisible] = useState(false)

    const showWhenVisible = { display: blogFormVisible ? 'none' : '' }

    const handleCreateNew = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
    }

    const toggleVisibility = () => {
        setBlogFormVisible(!blogFormVisible)
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

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
                <p>{user.author} is logged in. <button name='Logout' onClick={handleLogout}>Logout</button></p>
                <button onClick={() => setBlogFormVisible(true)}>Insert blog</button>
            </div>
        )
    }
}

export default Createblog
