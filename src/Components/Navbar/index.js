import { SearchBox } from "../SearchBox"
import { StyledNavBar, NavSection, StyledLink, StyledLogo } from "./styles"
import logo from './Logo2.png'
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function useApi() {
  const userId = localStorage.getItem('userId')
  const [UserNames, setUserNames] = useState()

  useEffect(() =>  {
    async function getData() {
      try {
        const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users'
        })
        setUserNames(data)
      }catch(error){
        console.log(error)
      }
    }
    
    getData()
    
  }, [])

  return { userId, UserNames }
}


export const NavBar = function({}) {
  const { userId, UserNames } = useApi()
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const history = useHistory()

  function handleClick(){

    dispatch({type: 'USER_LOGOUT'})
    localStorage.clear()
    history.push('/')
  }

  function handleClickName() {
    history.push(`/contactinfo/${userId}`)
  }

  return(
    <StyledNavBar>
      <NavSection>
        {!token && <StyledLink to='/login'>Ingresar</StyledLink>}
        {!token && <StyledLink to='/signup'>Registrarse</StyledLink>}
        <StyledLink to='/'>Categorías</StyledLink>
        {token && <StyledLink to='/'>Mis Transacciones</StyledLink>}
        {token && <StyledLink to='/sellproduct'>Vender</StyledLink>}
        <StyledLink to='/'><StyledLogo src={logo} /></StyledLink>
        {!!UserNames && UserNames.length > 0 && UserNames.map((usr, i) => {
          return usr._id === userId ?
            <section>
              <p key={i}>{`Hola ${usr.name}!`}</p>
              <Link onClick={handleClickName}>{`Dirección de envío: ${usr.address}`}</Link>
            </section>
          : 
            ''
        })}
        <SearchBox />
        {token && <button type='button' onClick={handleClick}>Cerrar Sesión</button>}
      </NavSection>
    </StyledNavBar>
  )
}