import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledNavBar = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  background-color: #ffffff;
  border-bottom: 1px solid #3856c1;
`
export const NavSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 30px 30px 0px 30px;
`
export const StyledLink = styled(Link)`
  color: #00008b;
  margin: 0px 10px 0px 10px;
  height: 20px;
`
export const StyledLogo = styled.img`
  margin: -65px 20px 0 -40px;
`

export const StyledParagraph = styled.p`

`