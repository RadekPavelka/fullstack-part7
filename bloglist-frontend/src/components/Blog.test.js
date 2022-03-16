import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container, likeBlog

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ian Tester',
    url: 'componenttest.com',
    likes: 10,
    user: { username: 'admin' },
  }

  beforeEach(() => {
    likeBlog = jest.fn()
    container = render(
      <Blog blog={blog} currentUser={'admin'} likeBlog={likeBlog} />
    ).container
  })

  test('at start the blog details are not displayed', () => {
    const div = container.querySelector('.blog')
    expect(div).toBeDefined()
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    const url = screen.queryByText(blog.url)
    expect(url).toBeNull()
    const likes = screen.queryByText(blog.likes)
    expect(likes).toBeNull()
  })

  test('after clicking the button, blog details are displayed', () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const div = container.querySelector('.blog')
    expect(div).toBeDefined()
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })
  test('if like button is clicked twice, the related event handler is called twice', () => {
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    const likeButton = screen.getByText('like')

    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
