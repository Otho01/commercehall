import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router"
import React from 'react'
import axios from 'axios'
import { changeError, changeEmail, changePassword, changePasswordConfirm, changeName } from '../../store/signUpReducer'


export const SignUp = function() {
  const history = useHistory()

  const { 
    name,
    password,
    passwordconfirm,
    email, } = useSelector(({signUpReducer}) => ({
      name: signUpReducer.name,
      password: signUpReducer.password,
      passwordconfirm: signUpReducer.passwordconfirm,
      email: signUpReducer.email,
      error: signUpReducer.error,
    }))

    async function handleSubmit(e) {
      e.preventDefault()

      if(password !== passwordconfirm) {
        dispatch(changeError('Los campos no coinciden'))
      }else {
        try {
          const { data } = await axios ({
            method: 'POST',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/users/signup',
            data: {
              name,
              password,
              email,
            },
          })
          localStorage.setItem('token', data.token)
          history.push('/loggedhome')
        }catch(error) {
          dispatch(changeError())
        }
      }
    }

  const dispatch = useDispatch()  

  return(
    <form onSubmit={handleSubmit}>
      <section>
      <label htmlFor='name'>Nombre</label>
        <input
          type='text'
          id='name'
          name='name'
          onChange={(e) => dispatch(changeName(e.target.value))}
          value={name}
        />
        <label htmlFor='email'>Correo</label>
        <input
          type='text'
          id='email'
          name='email'
          onChange={(e) => dispatch(changeEmail(e.target.value))}
          value={email}
        />
        <label htmlFor='password'>Contraseña</label>
        <input
          type='password'
          id='password'
          name='password'
          onChange={(e) => dispatch(changePassword(e.target.value))}
          value={password}
        />
        <label htmlFor='passwordconfirm'>Confirmar Contraseña</label>
        <input
          type='password'
          id='passwordconfirm'
          name='passwordconfirm'
          onChange={(e) => dispatch(changePasswordConfirm(e.target.value))}
          value={passwordconfirm}
        />
        <button
          type='submit'
        >
          Registrarse
        </button>
      </section>
    </form>
  )
}