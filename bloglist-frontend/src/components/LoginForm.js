import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')

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
      <form onSubmit={handleLogin}>
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
      </form>
    </div>
  )
}

export default LoginForm
