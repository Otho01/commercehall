import { StyledButton } from './styles'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const Cart = function() {
    const { cart } = useSelector(({productReducer}) => ({
      cart: productReducer.cart,
    }))

  const [openCart, setOpenCart] = useState(false)
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
        {!!cart && cart.length > 0 && cart.map(product => 
          <section>
            <h3>Productos en tu carrito</h3>
            <img src={product.productPictures} /> 
            <p>price={product.price}</p> 
            <p>prodname={product.name}</p>
          </section>
        )}
        <h3>Productos en tu carrito</h3>
      </Drawer>
    </>
  )
}