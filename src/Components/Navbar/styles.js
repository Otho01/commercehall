import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledNavBar = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  background-color: #ffffff;
`
export const NavSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`
export const StyledLink = styled(Link)`
  color: #00008b;
  margin: 50px 10px 15px 10px;
`
export const StyledLogo = styled.img`
  margin: 0px 20px auto 20px;
`