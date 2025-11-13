const Blog = ({ blog, handleLike, handleDel }) => {
	const handleLikeClick = () => {
		handleLike(blog)
	}
	const handleDelClick = () => {
		handleDel(blog.id)
	}
	return (
		<div>
			{blog.title}<br />
			<b>Author:</b> {blog.author}<br />
			<b>URL:</b> <a href={blog.url}>{blog.url}</a><br />
			<b>Likes:</b> {blog.likes} <button onClick={handleLikeClick}>Like</button><br />
			<button onClick={handleDelClick}>Del</button>
		</div>  
	)
}

export default Blog
