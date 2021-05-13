import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { NavBar } from "../../Components/Navbar"
import { ProductPicture } from "../../Components/ProductPicture"




  function useApi() {
    // const [picture, setPicture] = useState()
    // const [name, setName] = useState()
    const [products, setProducts] = useState()
    const [error, setError] = useState()

    const dispatch = useDispatch()
  
    useEffect(() => {
      async function getProducts() {
        try {
          const { data } = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/products',
            
          })
          setProducts(data)
        }catch(error) {
          dispatch(setError(error))
        }
      }

      getProducts()
  
      return () => {
        
      }
    })
    
    return { products }
  }
  
 export const HomePage = function() {
    const { products } = useApi()
    //  if(error) return <p>Algo salió mal!</p> 
  return (
    <section>
      <NavBar />
      {!!products && products.length > 0 && products.map((prod, i) => (
        <section>
        <ProductPicture 
          key={`chk-${i}`}
          picture={prod.productPictures}
          prodname={prod.name}
          price={prod.price}
        />
        </section>
      ))}
    </section>
  )
  }