import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')
    screen.debug(inputs[2])
    await user.type(inputs[0], 'title test')
    await user.type(inputs[1], 'author test')
    await user.type(inputs[2], 'url test')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title test')
    expect(createBlog.mock.calls[0][0].author).toBe('author test')
    expect(createBlog.mock.calls[0][0].url).toBe('url test')
})