import { useState } from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitLogin = async (event) => {
    event.preventDefault()
    handleLogin({
      username, password,
    })
    setUsername('')
    setPassword('')
  }

  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmitLogin}>
        <div>
          username
          <input
            type="text"
            name="username"
            onChange={handleChangeUsername}></input>
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            onChange={handleChangePassword}></input>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}
export default LoginForm