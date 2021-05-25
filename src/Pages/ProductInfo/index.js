import axios from "axios"
import React from 'react'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { NavBar } from "../../Components/Navbar"
import { addToCart, changeProducts } from "../../store/cartReducer"
import { StyledDescription, StyledSection, SytledPInfo } from "./styles"
import { Cart } from "../../Components/Cart"
import { CustomButton } from "../../Components/Button"

export const ProductInfo = function() {
  const dispatch = useDispatch()
  function useApi() {
    const { products, cart, amount } = useSelector(({cartReducer}) => ({
      products: cartReducer.products,
      cart: cartReducer.cart,
    }))

    const { id } = useParams()
    const dispatch = useDispatch()
  
    useEffect(() => {
      async function getProducts() {
        try {
          const { data } = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/products',
          })
          const datos = data.map(product => ({...product, amount: 0}))
          dispatch(changeProducts(datos))
        }catch(error) {
          
        }
      }

      getProducts()
  
    }, [cart])
    
    return { products, id, cart, amount }
  }

  
  const handleAddToCart = function(prod) {
    dispatch(addToCart(prod))
  }

  const { products, id, cart, amount} = useApi()

   return(
    <React.Fragment>
      <NavBar />
      <Cart quantity={amount} />
      {!!products && products.length > 0 && products.map((prod, i) => {
        return products[i]._id === id ?  
          <StyledSection>
            <img src={prod.productPictures} />
            <SytledPInfo>{prod.name}</SytledPInfo>
            <SytledPInfo>Precio: {prod.price}</SytledPInfo>
            <CustomButton
              Styles={{margin: '190px 0 0 0'}}
              Variant='outlined'
              OnClick={() => handleAddToCart(prod)}
            >
              Agregar al carrito
            </CustomButton>
            <StyledDescription>{prod.description}</StyledDescription>
          </StyledSection>
          : 
          ''
        })
      }
  </React.Fragment>
  )
}
