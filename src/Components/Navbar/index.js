import axios from "axios"
import logo from './Logo2.png'
import { Link } from "react-router-dom"
import { SearchBox } from "../SearchBox"
import { useHistory } from 'react-router'
import { CustomButton } from "../Button"
import { Button } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import { useEffect, useState } from "react"
import { changeFilteredData } from '../../store/cartReducer'
import { useDispatch, useSelector } from "react-redux"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { StyledNavBar, NavSection, StyledLink, StyledLogo } from "./styles"
import { changeProducts, openCloseCart } from "../../store/cartReducer"
import { changeSearch } from "../../store/searchReducer"




function useApi() {
  const userId = localStorage.getItem('userId')
  const [UserNames, setUserNames] = useState()
  const { cart, products, search  } = useSelector(({cartReducer, searchReducer}) => ({
    cart: cartReducer.cart,
    products: cartReducer.products,
    search: searchReducer.search,
  }))

  const dispatch = useDispatch()

  useEffect(() =>  {
    async function getData() {
      try {
        const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users'
        })
        setUserNames(data)
        dispatch(changeProducts(data))
      }catch(error){
        console.log(error)
      }
    }
    
    getData()
    
  }, [cart])

  return { userId, UserNames, cart, products, search}
}


export const NavBar = function() {

  const { userId, UserNames, cart, products, search  } = useApi()
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const history = useHistory()
  
  const handleSearchChange = event => (
    dispatch(changeSearch(event.target.value))
  )
  
  const fProducts = products.filter(p => {
    return p.name.toLowerCase().includes(search.toLowerCase())
  })

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

  console.log(fProducts)
  if(token) {
    return(
      <StyledNavBar>
        <NavSection>
          <StyledLink to='/' ><StyledLogo src={logo} /></StyledLink>
          <CustomButton Styles={{margin: '55px 30px 0 0'}} Variant='outlined' OnClick={() => handleClickSell()}>Vender</CustomButton>
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
          <SearchBox onClickFunction={() => dispatch(changeFilteredData(fProducts))} onChangeFunction={(e) => handleSearchChange(e)} />
          <Button onClick={() => handleOpenCart(true)}>
            <Badge badgeContent={cartTotalItems(cart)} color='error'>
              <AddShoppingCartIcon />
            </Badge>
          </Button>
          <CustomButton 
            type='CustomButton'
            Variant='outlined' 
            OnClick={handleClick}
            Styles={{margin: '50px 0 0 80px'}}
          >
            Cerrar Sesión
          </CustomButton>
        </NavSection>
      </StyledNavBar>
    )

  }else {
    return(
      <StyledNavBar>
        <NavSection>
          <StyledLink to='/' ><StyledLogo src={logo} /></StyledLink>
          {!token && <CustomButton Styles={{margin: '50px 0 0 0'}} Variant='outlined' OnClick={() => handleClickLogin()}>Ingresar</CustomButton>}
          {!token && <CustomButton Styles={{margin: '50px 0 0 0'}} Variant='outlined' OnClick={() => handleClickSignUp()}>Registrarse</CustomButton>}
          {token && <CustomButton Styles={{margin: '50px 0 0 0'}} Variant='outlined' OnClick={() => handleClickSell()}>Vender</CustomButton>}
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
          <SearchBox onClickFunction={() => dispatch(changeFilteredData(fProducts))} onChangeFunction={(e) => handleSearchChange(e, fProducts)} />
          <Button onClick={() => handleOpenCart(true)}>
            <Badge badgeContent={cartTotalItems(cart)} color='error'>
              <AddShoppingCartIcon />
            </Badge>
          </Button>
          {token && 
            <CustomButton 
              type='CustomButton'
              Variant='outlined' 
              OnClick={handleClick}
              Styles={{margin: '50px 0 0 80px'}}
            >
              Cerrar Sesión
            </CustomButton>}
        </NavSection>
      </StyledNavBar>
    )
  }
}