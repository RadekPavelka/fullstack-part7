import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = () => {
    setValue('')
  }

  const inputValues = () => {
    return {
      name, 
      value,
      onChange
    }
  }

return {
    name,
    value,
    onChange,
    resetValue,
    inputValues
  }
}