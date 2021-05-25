import { Link } from 'react-router-dom'
import styled from 'styled-components'
import background from './Back.png'
import { TextField } from '@material-ui/core'

export const Wrapper = styled.section`
  display: block;
  background: url(${background}); 
  height: 100vh;
`

export const StyledFormLogin = styled.form`
  display: grid;
  grid-column-template: repeat(2, 50%);
  flex-direction: column;
  justify-content: space-between;
  padding: 200px 0px 0px 800px;
`

export const StyledLink = styled(Link)`

`

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  grid-column: ${props => props.primerColumna ? '1': props.segundaColumna ? '2' : '' };
  max-width: 100%;
`

export const StyledLabelLogin = styled.label`
  font-weight: bold;
  font-size: 20px;
  margin: 30px 0 0 0;
`

export const StyledInputLogin = styled(TextField)`
  
`