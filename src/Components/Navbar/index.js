import axios from "axios"
import logo from './Logo2.png'
import { SearchBox } from "../SearchBox"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { Button } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { StyledNavBar, NavSection, StyledLink, StyledLogo } from "./styles"
import { openCloseCart } from "../../store/cartReducer"
import { CustomButton } from "../Button"



function useApi() {
  const userId = localStorage.getItem('userId')
  const [UserNames, setUserNames] = useState()
  const { cart } = useSelector(({cartReducer}) => ({
    cart: cartReducer.cart,
    products: cartReducer.products,
  }))

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
    
  }, [cart])

  return { userId, UserNames, cart }
}


export const NavBar = function() {

  const { userId, UserNames, cart } = useApi()
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

  function handleOpenCart() {
    dispatch(openCloseCart(true))
  }

  function handleClickLogin() {
    history.push('/login')
  }

  function handleClickSignUp() {
    history.push('/signup')
  }
  
  function handleClickSell() {
    history.push('/sellproduct')
  }
  const cartTotalItems = product => product.reduce((ack, cv) => {
     return product.length > 0 ? ack + cv.amount : 1
  }, 0)
  
  console.log(cart)
  return(
    <StyledNavBar>
      <NavSection>
        {!token && <CustomButton OnClick={() => handleClickLogin()}>Ingresar</CustomButton>}
        {!token && <CustomButton OnClick={() => handleClickSignUp()}>Registrarse</CustomButton>}
        <CustomButton to='/' needstopmargin >Categorías</CustomButton>
        {token && <CustomButton to='/'>Mis Transacciones</CustomButton>}
        {token && <CustomButton OnClick={() => handleClickSell()}>Vender</CustomButton>}
        <StyledLink to='/'><StyledLogo src={logo} /></StyledLink>
        {!!UserNames && UserNames.length > 0 && UserNames.map((usr, i) => {
          return usr._id === userId 
          ?
            <section key={`navsect-${i}`}>
              <p key={`p-${i}`}>{`Hola ${usr.name}!`}</p>
              <CustomButton OnClick={handleClickName} Variant='outlined' key={`navlink-${i}`} >{`Dirección de envío: ${usr.address}`}</CustomButton>
            </section>
          : 
            ''
        })}
        <SearchBox />
        <Button onClick={() => handleOpenCart(true)}>
          <Badge badgeContent={cartTotalItems(cart)} color='error'>
            <AddShoppingCartIcon />
          </Badge>
        </Button>
        {token && <CustomButton type='CustomButton' Variant='outlined' OnClick={handleClick}>Cerrar Sesión</CustomButton>}
      </NavSection>
    </StyledNavBar>
  )
}