import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        author: 'testaaja',
        name: 'esa testaaja',
        url: 'www.testaaja.fi',
        likes: 9
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('www.testaaja.fi')

    expect(element).toBeDefined()
})
