import { SearchBox } from "../SearchBox"
import { StyledNavBar, NavSection, StyledLink, StyledLogo } from "./styles"
import logo from './Logo2.png'
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"

export const NavBar = function() {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const history = useHistory()

  function handleClick(){

    dispatch({type: 'USER_LOGOUT'})
    localStorage.clear()
    history.push('/')
  }
  return(
    <StyledNavBar>
      <NavSection>
        {!token && <StyledLink to='/login'>Ingresar</StyledLink>}
        {!token && <StyledLink to='/signup'>Registrarse</StyledLink>}
        <StyledLink to='/'>Categorías</StyledLink>
        <StyledLink to='/'><StyledLogo src={logo} /></StyledLink>
        {token && <StyledLink to='/'>Mis Transacciones</StyledLink>}
        {token && <StyledLink to='/sellproduct'>Vender</StyledLink>}
        <SearchBox />
        {token && <button type='button' onClick={handleClick}>Cerrar Sesión</button>}
      </NavSection>
    </StyledNavBar>
  )
}