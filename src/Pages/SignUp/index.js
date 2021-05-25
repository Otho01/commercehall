import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router"
import React from 'react'
import axios from 'axios'
import { changeError, changeEmail, changePassword, changePasswordConfirm, changeName } from '../../store/signUpReducer'
import { StyledFormSignUp, StyledInputSignUp, StyledLabelSignUp, StyledSectionSignUp, WrapperSignUp } from './styles'
import { CustomButton } from '../../Components/Button'


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
          localStorage.setItem('userId', data.usrId)
          history.push(`/loggedhome/${data.usrId}`)
        }catch(error) {
          dispatch(changeError())
        }
      }
    }

  const dispatch = useDispatch()  

  return(
    <WrapperSignUp>
      <CustomButton
        Styles={{margin: '30px 0 0 30px'}}
        Variant='outlined'
        Type='button'
        OnClick={() => history.push('/')}
      >
        Inicio
      </CustomButton>
      <StyledFormSignUp onSubmit={handleSubmit}>
        <StyledSectionSignUp>
        <StyledLabelSignUp htmlFor='name'>Nombre</StyledLabelSignUp>
          <StyledInputSignUp
            type='text'
            id='name'
            name='name'
            onChange={(e) => dispatch(changeName(e.target.value))}
            value={name}
          />
          <StyledLabelSignUp htmlFor='email'>Correo</StyledLabelSignUp>
          <StyledInputSignUp
            type='text'
            id='email'
            name='email'
            onChange={(e) => dispatch(changeEmail(e.target.value))}
            value={email}
          />
          <StyledLabelSignUp htmlFor='password'>Contraseña</StyledLabelSignUp>
          <StyledInputSignUp
            type='password'
            id='password'
            name='password'
            onChange={(e) => dispatch(changePassword(e.target.value))}
            value={password}
          />
          <StyledLabelSignUp htmlFor='passwordconfirm'>Confirmar Contraseña</StyledLabelSignUp>
          <StyledInputSignUp
            type='password'
            id='passwordconfirm'
            name='passwordconfirm'
            onChange={(e) => dispatch(changePasswordConfirm(e.target.value))}
            value={passwordconfirm}
          />
          <CustomButton
            Type='submit'
            Variant='outlined'
          >
            Registrarse
          </CustomButton>
          <StyledLabelSignUp htmlFor='passwordconfirm'>¿Ya tienes cuenta?</StyledLabelSignUp>
          <CustomButton
            Type='submit'
            Variant='outlined'
            OnClick={() => history.push('/login')}
          >
            Ingresa aquí
          </CustomButton>
        </StyledSectionSignUp>
      </StyledFormSignUp>
    </WrapperSignUp>
  )
}