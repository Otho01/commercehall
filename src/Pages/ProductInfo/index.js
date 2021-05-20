import axios from "axios"
import React from 'react'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { NavBar } from "../../Components/Navbar"
import { addToCart, changeAmount, changeProducts } from "../../store/productReducer"
import { StyledSection } from "./styles"
import { Cart } from "../../Components/Cart"

export const ProductInfo = function() {
  const dispatch = useDispatch()
  function useApi() {
    const { products, cart, amount } = useSelector(({productReducer}) => ({
      products: productReducer.products,
      cart: productReducer.cart,
      amount: productReducer.amount,
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
            <p>{prod.name}</p>
            <p>{prod.price}</p>
            <button
              onClick={() => handleAddToCart(prod)}
            >
              Agregar al carrito
            </button>
          </StyledSection>
          : 
          ''
        })
      }
  </React.Fragment>
  )
}
