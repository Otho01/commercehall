import { StyledButton, StyledSection, Wrapper } from './styles'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const Cart = function() {
  const [openCart, setOpenCart] = useState(false)
  
  const { cart } = useSelector(({productReducer}) => ({
    cart: productReducer.cart,
    total: productReducer.total,
    amount: productReducer.amount,
  }))
  // const handler = window.ePayco.checkout.configure({
  //   key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
  //   test: true
  // })

  // const data = {
  //   external: 'false',
  //   autoclick: 'false',

  //   amount: total,
  // }

  const getCartTotal = (cartItem) => {
    return cartItem.reduce((ack, cv) => {
      return ack + cv.product.price * cv.amount
    }, 0)
  }

  const cartTotalItems = product => product.reduce((ack, cv) => {
    return ack + cv.amount
  }, 0)

  return(
    <>
      <StyledButton onClick={() => setOpenCart(true)}>
        <Badge badgeContent={cartTotalItems(cart)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Drawer
        anchor='right'
        open={openCart}
        onClose={() => setOpenCart(false)}
      >
        <h3>Productos en tu carrito</h3>
        <p>Total de tu carrito: {getCartTotal(cart)}</p>
          {!!cart && cart.length > 0 && cart.map(product => 
            <Wrapper>
              <StyledSection key={product.product._id}>
                <img src={product.product.productPictures} alt='product'/> 
                <p>{product.product.name}</p>
                <p>Descripción: {product.product.description}</p>
                <p>Precio {product.product.price * product.amount}</p>
                <p>Cantidad: {product.amount}</p>
              </StyledSection>
            </Wrapper>
          )}
      </Drawer>
    </>
  )
}