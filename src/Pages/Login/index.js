import axios from 'axios'
import loginimg from './front.png'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { NavBar } from '../../Components/Navbar'
import { changeEmail, changePassword, changeError } from '../../store/loginReducer'
import { StyledFormLogin, StyledInputLogin, StyledLabelLogin, StyledSection, Wrapper } from './styles'
import { CustomButton } from '../../Components/Button'
import { ProductPicture } from '../../Components/ProductPicture'
import React from 'react'

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
      localStorage.setItem('userId', data.userId)
      history.push(`/loggedhome/${data.userId}`)
    }catch(error) {
      dispatch(changeError(error))
    }
  }
  return (
    <Wrapper>
      <CustomButton
        Styles={{margin: '30px 0 0 30px'}}
        Variant='outlined'
        Type='button'
        OnClick={() => history.push('/')}
      >
        Inicio
      </CustomButton>
      <StyledFormLogin onSubmit={handleSubmit}>
        <StyledSection >
          <StyledLabelLogin htmlFor='email'>Correo</StyledLabelLogin>
          <StyledInputLogin
            type='text'
            id='email'
            name='email'
            value={email}
            onChange={(e) => dispatch(changeEmail(e.target.value))}
          />
          <StyledLabelLogin htmlFor='password'>Contraseña</StyledLabelLogin>
          <StyledInputLogin
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => dispatch(changePassword(e.target.value))}
          />
          <CustomButton
            Styles={{marginTop: '30px'}}
            Type='submit'
            Variant='outlined'
          >
            Ingresar
          </CustomButton>
          <StyledLabelLogin htmlFor='password'>¿No tienes cuenta?</StyledLabelLogin>
          <CustomButton
            Styles={{marginTop: '30px'}}
            Type='button'
            Variant='outlined'
            OnClick={() => history.push('/signup')}
          >
            Registrate Aquí
          </CustomButton>
        </StyledSection>
      </StyledFormLogin>
    </Wrapper>
  )
}