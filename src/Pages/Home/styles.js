import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

export const StyledMain = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 25%);
`
export const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: black;
  font-weight: bold;
`

export const StyledSectionHome = styled.section`
  display: inline-block;
  z-index: 100;
  width: 25%;
  margin-top: 20px;
`
export const StyledButtonHome = styled(Button)`
  margin: 2px;
`