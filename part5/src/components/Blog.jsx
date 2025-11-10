const Blog = ({ blog, handleLike }) => {
	const handleLikeClick = () => {
		handleLike(blog)
	}
	return (
		<div>
			{blog.title}<br />
			<b>Author:</b> {blog.author}<br />
			<b>URL:</b> <a href={blog.url}>{blog.url}</a><br />
			<b>Likes:</b> {blog.likes} <button onClick={handleLikeClick}>Like</button>
		</div>  
	)
}

export default Blog
