const Notification = ({ notification }) => {
	if(notification === null) {
		return null
	}

	return (
		<div className={notification.type}>
		   {notification.msg}
		</div>
	)
}


export default Notification
