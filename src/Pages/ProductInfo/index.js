import axios from "axios";
import React from 'react'
import { useEffect, useState } from "react";
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { NavBar } from "../../Components/Navbar";
import { addToCart, changeProducts } from "../../store/productReducer";
import { StyledSection } from "./styles";
import { Cart } from "../../Components/Cart";

export const ProductInfo = function() {
  const dispatch = useDispatch()
  const [openCart, setOpenCart] = useState(false)
  function useApi() {
    const { products, cart } = useSelector(({productReducer}) => ({
      products: productReducer.products,
      cart: productReducer.cart,
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
          dispatch(changeProducts(data))
        }catch(error) {
          
        }
      }

      getProducts()
  
    }, [cart])
    
    return { products, id, cart }
  }

  
  const handleAddToCart = prod => (
    dispatch(addToCart(prod)) 
  )

  const { products, id, cart} = useApi()
  return(
    <React.Fragment>
      <NavBar />
      <Cart />
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
        }
      )
      }
  </React.Fragment>
  )
}
