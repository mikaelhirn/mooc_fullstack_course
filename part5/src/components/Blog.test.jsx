import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', async () => {
    const blog = {
        author: 'testaaja',
        name: 'esa testaaja',
        url: 'www.testaaja.fi',
        likes: 9
    }

    const mockHandler = vi.fn()

    const handleLike = (blog) => {
        console.log('liked')
    }

    render(<Blog blog={blog} handleLike={mockHandler} />)
    screen.debug() 
    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    console.log(expect(mockHandler.mock.calls))
    expect(mockHandler.mock.calls).toHaveLength(1)
})
