import axios from "axios";
import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { NavBar } from "../../Components/Navbar";
import { ProductPicture } from "../../Components/ProductPicture";
import { changeProducts } from "../../store/productReducer";
import { StyledSection } from "./styles";

export const ProductInfo = function() {
  function useApi() {
    const { products } = useSelector(({productReducer}) => ({
      products: productReducer.products,
    }))

    const [error, setError] = useState()
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
          // dispatch(setError(error))
        }
      }

      getProducts()
  
      return () => {
        
      }
    }, [])
    
    return { products, id }
  }

  const { products, id} = useApi()
  return(
    <React.Fragment>
    <NavBar />
    {!!products && products.length > 0 && products.map((prod, i) => {
      return products[i]._id === id ?  
        <StyledSection>
          <img src={prod.productPictures} />
          <p>{prod.name}</p>
          <p>{prod.price}</p>
        </StyledSection>
      : 
        ''
     }
     )}
  </React.Fragment>
  )
}
