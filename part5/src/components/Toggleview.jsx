import { useState } from 'react'

const Toggleview = (props) => {

    const bStyle = {
        padding: 10,
        border: 'solid',
        borderWidth: 1,
        borderColor: 'red',
        margin: 5
    }

    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return(
        <div style={bStyle}>
            <div>
                <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
            </div>
            <div style={hideWhenVisible}>
                <p id="title">{props.blog.title}</p> | <p id="author">{props.blog.author}</p>
            </div>
            <div style={showWhenVisible}>
                {props.children}
            </div>
        </div>
    )
}

export default Toggleview
