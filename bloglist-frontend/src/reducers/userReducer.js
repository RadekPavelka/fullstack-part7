import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { createNotification } from './notificationReducer'
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (user) => {
  return async (dispatch) => {
    console.log('in loginUser function')
    console.log('user', user)
    try {
      const loggedInUser = await loginService.login({
        username: user.username,
        password: user.password,
      })
      console.log('loggedInUSer', loggedInUser)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedInUser)
      )
      blogService.setToken(loggedInUser.token)
      dispatch(setUser(loggedInUser))
      dispatch(createNotification({ text: `${loggedInUser.username} logged in!`, type: 'info' }, 5))

    } catch (e) {
      dispatch(createNotification({ text: 'Wrong credentials', type: 'alert' }, 5))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
