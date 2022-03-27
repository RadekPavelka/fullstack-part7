import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    const user = { username, password }

    dispatch(loginUser(user))

    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Username:
          </Form.Label>
          <Col sm={3}>
            <Form.Control id="username" type="text" name="username" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Password:
          </Form.Label>
          <Col sm={3}>
            <Form.Control id="password" type="password" name="password" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Button id="login-button" variant="primary" type="submit">
              login
            </Button>
          </Col>
        </Form.Group>
      </Form>
      {/*       <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" type="text" name="username" />
        </div>
        <div>
          password
          <input id="password" type="password" name="password" />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form> */}
    </div>
  )
}

export default LoginForm
