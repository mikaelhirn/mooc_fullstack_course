import { render, screen } from '@testing-library/react'
import Toggleview from './Toggleview'
import userEvent from '@testing-library/user-event'

test('<Toggleview /> renders title and author', async () => {
    // const createBlog = vi.fn()
    // const user = userEvent.setup()

    const _blog = {
        title: 'Testiotsikko',
        author: 'Testaaja',
        url: 'www.testidomaini.org',
        likes: 1
    }

    const { container } = render(<Toggleview blog={_blog} />)

    // screen.debug()

    const title_element = container.querySelector('#title')
    expect(title_element).toHaveTextContent('Testiotsikko')
    const author_element = container.querySelector('#author')
    expect(author_element).toHaveTextContent('Testaaja')

    const url_element = screen.queryAllByText('www.testidomaini.org') 
    expect(url_element).toHaveLength(0)

    const likes_element = screen.queryAllByText('Likes') 
    expect(likes_element).toHaveLength(0)
})
