import { useState } from 'react'
import { StyledButton, StyledSection, Wrapper } from './styles'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Cart = function() {
  const [openCart, setOpenCart] = useState(false)
  
  const { cart, address, phone, nationalId, name } = useSelector(({productReducer, contactReducer, signUpReducer}) => ({
    name: signUpReducer.name,
    cart: productReducer.cart,
    phone: contactReducer.phone,
    total: productReducer.total,
    amount: productReducer.amount,
    address: contactReducer.address,
    nationalId: contactReducer.nationalId,
  }))
  const token = localStorage.getItem('token')
  const history = useHistory()

  const getCartTotal = (cartItem) => {
    return cartItem.reduce((ack, cv) => {
      return ack + cv.product.price * cv.amount
    }, 0)
  }

  const ctotal = getCartTotal(cart)
  console.log(ctotal)
  const cartTotalItems = product => product.reduce((ack, cv) => {
    return ack + cv.amount
  }, 0)

  function handlePayment(e) {
    const handler = window.ePayco.checkout.configure({
      key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
      test: true
    })
  
    const data = {
      external: 'false',
      autoclick: 'false',
  
      amount: ctotal,
      tax: '0',
      tax_base: '0',
      name: 'carrito de compras',
      description: 'Productos del carrito',
      currency: 'cop',
  
      country: 'CO',
      lang: 'es',
  
      invoice: '1',
  
      // response:
      
      name_billing: name,
      address_billing: address,
      type_doc_billing: 'CC',
      number_doc_billing: nationalId,
      mobilephone_billing: phone,
      email_billing: 'luis@gmail.com',
  
      methodsDisable: [ 'CASH', 'SP', 'PSE', 'DP' ],
    }

    !!token ? handler.open(data) : history.push('/login')
  }

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
        variant= 'persistent'
      >
        <h3>Productos en tu carrito</h3>
        <p>Total de tu carrito: {getCartTotal(cart)}</p>
        {!!cart && cart.length > 0 &&
        <button
          type='button'
          onClick={handlePayment}
        >
          Proceder al pago
        </button>}
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