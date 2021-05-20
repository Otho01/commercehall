import { StyledButton } from './styles'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Cart = function() {
  const [openCart, setOpenCart] = useState(false)
  const dispatch = useDispatch()
  
  const { cart, total } = useSelector(({productReducer}) => ({
    cart: productReducer.cart,
    total: productReducer.total,
    amount: productReducer.amount,
  }))
  console.log(cart)
  // const handler = window.ePayco.checkout.configure({
  //   key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
  //   test: true
  // })

  const data = {
    external: 'false',
    autoclick: 'false',

    amount: total,
  }

  const totalItems = cart.length

  const getTotalPrice = (cartItem, amount) => {
    return cartItem.reduce((ack, cv) => {
      const totalPrice = cv.price * totalItems
      return totalPrice
    }, 0)
  }

  return(
    <>
      <StyledButton onClick={() => setOpenCart(true)}>
        <Badge color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Drawer
        anchor='right'
        open={openCart}
        onClose={() => setOpenCart(false)}
      >
        <h3>Productos en tu carrito</h3>
        {!!cart && cart.length > 0 && cart.map(product => 
          <section key={product._id}>
            <img src={product.productPictures} /> 
            <p>Precio={product.price * product.amount}</p>
            <p>prodname={product.name}</p>
            <p>Cantidad:{product.amount}</p>
          </section>
        )}
      </Drawer>
    </>
  )
}