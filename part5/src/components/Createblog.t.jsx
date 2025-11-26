import { render, screen } from '@testing-library/react'
import Createblog from './Createblog'
import userEvent from '@testing-library/user-event'

test('<Createblog /> updates parent, calls submit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const _user = {
        author: 'testaaja'
    }

    const _notificationMessage = {
        type: "ok",
        msg: "test message."
    }

    render(<Createblog createBlog={createBlog} user={_user} notificationMessage={_notificationMessage} />)

    const insertButton = screen.getByText('Insert blog')
    await user.click(insertButton)

    const input_title = screen.getByText('title')
    const input_author = screen.getByText('author')
    const input_url = screen.getByText('url')
    const sendButton = screen.getByText('Create')

    await user.type(input_title, "testing title..")
    await user.type(input_author, "testing author..")
    await user.type(input_url, "testing url..")

    await user.click(sendButton)

    console.log(createBlog.mock.calls)
})
