const Blog = ({ blog }) => {
	return (
		<div>
			{blog.title}<br />
			<b>Author:</b> {blog.author}<br />
			<b>URL:</b> <a href={blog.url}>{blog.url}</a><br />
			<b>Likes:</b> 0 <button>Like</button>
		</div>  
	)
}

export default Blog
