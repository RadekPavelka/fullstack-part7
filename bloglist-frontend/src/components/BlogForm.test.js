import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> passes data from input fields to event handler correctly', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const titleInput = component.container.querySelector('#title-input')
  const authorInput = component.container.querySelector('#author-input')
  const urlInput = component.container.querySelector('#url-input')

  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { target: { value: 'A new blog' } })
  fireEvent.change(authorInput, { target: { value: 'Random Guy' } })
  fireEvent.change(urlInput, { target: { value: 'random.com/blog' } })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('A new blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Random Guy')
  expect(createBlog.mock.calls[0][0].url).toBe('random.com/blog')
})
