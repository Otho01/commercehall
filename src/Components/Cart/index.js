import { useState } from 'react'
import { IncreaseButton, StyledButtonID, StyledSection, StyledSectionButtons, Wrapper, StyledParagraphC } from './styles'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, openCloseCart, removeFromCart } from '../../store/cartReducer'
import { CustomButton } from '../Button'


export const Cart = function() {
  
  const dispatch = useDispatch()
  
  const { cart, address, phone, nationalId, name, openCart } = useSelector(({cartReducer, contactReducer, signUpReducer}) => ({
    name: signUpReducer.name,
    cart: cartReducer.cart,
    phone: contactReducer.phone,
    total: cartReducer.total,
    openCart: cartReducer.openCart,
    address: contactReducer.address,
    nationalId: contactReducer.nationalId,
  }))
  const token = localStorage.getItem('token')
  const history = useHistory()

  const getCartTotalPrice = cartItem => {
      return cartItem.reduce((ack, cv) => {
          const ctotal = !!cv.product && cv.product.price * cv.amount + ack
          return ctotal
      }, 0)
  }


  const ctotal = getCartTotalPrice(cart)
  
  const handleAddToCart = function(product) {
    dispatch(addToCart(product))
  }

  const handleRemoveFromCart = function(product) {
    dispatch(removeFromCart(product))
  }

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
  
      response: `${process.env.REACT_APP_BASE_URL}/transactionresult`,

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
      
      <Drawer
        anchor='right'
        open={openCart}
        onClose={() => dispatch(openCloseCart(false))}
        variant='persistent'
      >
        <h3>Productos en tu carrito</h3>
        <p>Total de tu carrito: {getCartTotalPrice(cart)}</p>
        <StyledSectionButtons>
          {!!cart && cart.length > 0 &&
          <CustomButton
            Variant='outlined'
            type='button'
            OnClick={handlePayment}
          >
            Proceder al pago
          </CustomButton>}
          <CustomButton
            Variant='outlined'
            type='button'
            OnClick={() => dispatch(openCloseCart(false))}
          >
            Cerrar carrito
          </CustomButton>
        </StyledSectionButtons>
          {!!cart && cart.length > 0 && cart.map((product) =>
            <Wrapper>
              <StyledSection key={!!product.product && product.product._id}>
                {!!product.product && <img src={product.product.productPictures} alt='product'/>}
                {!!product.product && <p>{product.product.name}</p>}
                {!!product.product && <p>Descripción: {product.product.description}</p>}
                {!!product.product && <p>Precio {product.product.price * product.amount}</p>}
                {!!product.product && cart.length > 0 &&
                <CustomButton
                  Styles={{alignSelf: 'center'}}
                  Variant='outlined'
                  type='button'
                  OnClick={() => handleAddToCart(product.product)}
                >
                  +
                </CustomButton>}
                {!!product.amount && <StyledParagraphC className='paragraphs'>{product.amount}</StyledParagraphC>}
                {!!product.product && cart.length > 0 &&
                <CustomButton
                Styles={{alignSelf: 'center'}}
                  Variant='outlined'
                  type='button'
                  OnClick={() => handleRemoveFromCart(product)}
                >
                  -
                </CustomButton>}
              </StyledSection>
            </Wrapper>
          )}
      </Drawer>
    </>
  )
}