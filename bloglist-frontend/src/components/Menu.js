import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = () => {
  /*   const padding = {
    paddingRight: 5,
  } */

  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser())
  }

  const loggedInUser = useSelector((state) => state.user.username)
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Bloglist App</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/blogs">
              <Nav.Link>blogs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
              <Nav.Link>users</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      {loggedInUser} logged in{' '}
      <Button variant="outline-warning" id="logout-button" type="submit" onClick={handleLogout}>
        logout
      </Button>
    </div>
  )
}

export default Menu
