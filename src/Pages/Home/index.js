import axios from "axios"
import { StyledLink } from "./styles"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Cart } from "../../Components/Cart"
import { NavBar } from "../../Components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { ProductPicture } from "../../Components/ProductPicture"
import { addToCart, changeProducts } from "../../store/productReducer"


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
   const dispatch = useDispatch()
   
   function handleClick(prod)  {
     history.push(`/productinfo/${prod._id}`)
   }

   const handleAddToCart = prod => {
    dispatch(addToCart(prod))
  }

    const { products } = useApi()
    return (
      <section>
        <Cart />
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
            <button
              key={i}
              type='button'
              onClick={() => handleAddToCart(prod)}
            >
              Agregar al carrito
            </button>
          </section>
        ))}
      </section>
    )
}