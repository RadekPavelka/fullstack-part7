import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

let timeoutId = null

export const createNotification = (notification, timeInSec) => {
  return (dispatch) => {
    dispatch(setNotification(notification))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(setNotification(null))
    }, timeInSec * 1000)
  }
}

export default notificationSlice.reducer
