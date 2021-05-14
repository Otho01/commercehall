import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { NavBar } from "../../Components/Navbar"
import { ProductPicture } from "../../Components/ProductPicture"
import { changeProducts } from "../../store/productReducer"
import { StyledLink } from "./styles"

function useApi() {
  const { products } = useSelector(({productReducer}) => ({
    products: productReducer.products,
  }))

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
        dispatch(changeProducts(data))
      }catch(error) {
        dispatch(setError(error))
      }
    }

    getProducts()

    return () => {
      
    }
  }, [])
  
  return { products }
  }
  
 export const HomePage = function() {
   const history = useHistory()

   function handleClick(prod)  {
     history.push(`/productinfo/${prod._id}`)
   }
  
    const { products } = useApi()
    return (
      <section>
        <NavBar />
        {!!products && products.length > 0 && products.map((prod, i) => (
          <section>
            <StyledLink onClick={() => handleClick(prod)}
            >
              <ProductPicture
                key={`chk-${i}`}
                picture={prod.productPictures}
                prodname={prod.name}
                price={prod.price}
              />
            </StyledLink>
          </section>
        ))}
      </section>
    )
}