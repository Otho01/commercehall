import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { Button } from "../Button"
import { SearchBox } from "../SearchBox"
import { StyledNavBar, NavSection, StyledLink, StyledLogo } from "./styles"
import logo from './Logo2.png'

export const NavBar = function() {
  const history = useHistory()
  const token = localStorage.getItem('token')
  return(
    <StyledNavBar>
      <NavSection>
        {!token && <StyledLink to='/'>Ingresar</StyledLink>}
        {!token && <StyledLink to='/'>Registrarse</StyledLink>}
        <StyledLink to='/'>Categorías</StyledLink>
        <StyledLogo src={logo} />
        {token && <StyledLink to='/'>Mis Transacciones</StyledLink>}
        <SearchBox />
      </NavSection>
    </StyledNavBar>
  )
}