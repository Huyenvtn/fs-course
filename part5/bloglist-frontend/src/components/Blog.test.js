import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Go To Statement Considered Harmfull',
        author: 'Edsger W. Dijkstraa',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfull.html',
        likes: 555,
    }

    render(<Blog blog={blog} />)

    const titleElement = screen.getByText('Go To Statement Considered Harmfull Edsger W. Dijkstraa')
    expect(titleElement).toBeDefined()
    const urlElement = screen.queryByText('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfull.html')
    expect(urlElement).toBeNull()
    const likesElement = screen.queryByText('555')
    expect(likesElement).toBeNull()
})

test('clicking the button calls event handler once', async () => {
    const blog = {
        title: 'Go To Statement Considered Harmfull',
        author: 'Edsger W. Dijkstraa',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfull.html',
        likes: 555,
    }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} handleShow={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
})