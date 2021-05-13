import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { changeEmail, changePassword, changeError } from '../../store/loginReducer'

export const Login = function() {

  const history = useHistory()
  const dispatch = useDispatch()

  const { email, password, error } = useSelector(({loginReducer}) => ({
    email: loginReducer.email,
    password: loginReducer.password,
    error: loginReducer.error,
  }))

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/signin',
        data: {
          email,
          password,
        }
      })
      localStorage.setItem('token', data.token)
      history.push('/loggedhome')
    }catch(error) {
      dispatch(changeError(error))
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <section>
        <label htmlFor='email'>Correo</label>
        <input
          type='text'
          id='email'
          name='email'
          value={email}
          onChange={(e) => dispatch(changeEmail(e.target.value))}
        />
        <label htmlFor='password'>Contraseña</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(e) => dispatch(changePassword(e.target.value))}
        />
        <button
          type='submit'
        >
          Ingresar
        </button>
      </section>
    </form>
  )
}