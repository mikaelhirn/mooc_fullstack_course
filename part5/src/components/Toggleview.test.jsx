import { render, screen } from '@testing-library/react'
import Toggleview from './Toggleview'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const _blog = {
    title: 'Testiotsikko',
    author: 'Testaaja',
    url: 'www.testidomaini.org',
    likes: 1
}

describe('Testing the form', () => {
    test('<Toggleview /> renders title and author', async () => {


        const { container } = render(<Toggleview blog={_blog} />)

        const title_element = container.querySelector('#title')
        expect(title_element).toHaveTextContent('Testiotsikko')
        const author_element = container.querySelector('#author')
        expect(author_element).toHaveTextContent('Testaaja')

        const url_element = screen.queryAllByText('www.testidomaini.org')
        expect(url_element).toHaveLength(0)

        const likes_element = screen.queryAllByText('Likes')
        expect(likes_element).toHaveLength(0)
    })

    test('<Toggleview /> renders url and likes', async () => {
        render(<Toggleview blog={_blog}><Blog key={_blog.id} blog={_blog} /></Toggleview>)
        const user = userEvent.setup()
        const button = screen.getByText('Show')
        await user.click(button)

        const likes_element = screen.queryAllByText('Like')
        expect(likes_element).toHaveLength(1)
        const url_element = screen.queryAllByText('URL', { exact: false })
        expect(url_element).toHaveLength(1)

    })
    test('<Toggleview /> clicking like twise calls the event handler twice.', async () => {
        const mockHandled = vi.fn()
        render(<Toggleview blog={_blog}><Blog key={_blog.id} blog={_blog} handleLike={mockHandled}/></Toggleview>)
        const user = userEvent.setup()
        const button = screen.getByText('Like')
        await user.click(button) //1. click
        await user.click(button) //2. click
        expect(mockHandled.mock.calls).toHaveLength(2)
    })
})
