import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleview from './Toggleview'

const blog = {
    title: 'testi title',
}

describe('<Toggable />', () => {
    beforeEach(() => {
    render(
        <Toggleview blog={blog}>
            <div>togglable content</div>
        </Toggleview>
        )
    })

    test('renders its children', () => {
        screen.getByText('togglable content')
    })

    test('at start the children are not displayed', () => {
        const element = screen.getByText('togglable content')
        expect(element).not.toBeVisible()
    })

    test('after click, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('Show')
        await user.click(button)

        const element = screen.getByText('togglable content')
        expect(element).toBeVisible()
    })

    test('togglable can be hidden', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('Show')
        await user.click(button)

        const hideButton = screen.getByText('Hide')
        await user.click(hideButton)

        const element = screen.getByText('togglable content')
        expect(element).not.toBeVisible()
    })
})
