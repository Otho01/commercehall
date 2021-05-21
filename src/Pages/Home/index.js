import axios from "axios"
import { StyledLink } from "./styles"
import { useEffect } from "react"
import { useHistory } from "react-router"
import { Cart } from "../../Components/Cart"
import { NavBar } from "../../Components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { ProductPicture } from "../../Components/ProductPicture"
import { addToCart, changeProducts } from "../../store/productReducer"


function useApi() {
  const { products, cart, total } = useSelector(({productReducer}) => ({
    products: productReducer.products,
    total: productReducer.total,
    cart: productReducer.cart,
    amount: productReducer.amount,
  }))
  
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
        dispatch(error)
      }
    }

    getProducts()
    
    return () => {
      
    }
  }, [cart])
  
  return { products, cart, total }
}
  
 export const HomePage = function() {
   const history = useHistory()
   const dispatch = useDispatch()
   
   function handleClick(prod)  {
     history.push(`/productinfo/${prod._id}`)
   }

  const handleAddToCart = function(prod) {
    dispatch(addToCart(prod))
  }
    
    const { products, cart } = useApi()
    return (
      <section>
        <NavBar />
        <Cart />
        {!!products && products.length > 0 && products.map((prod, i) => (
          <section key={`sctn-${i}`} >
            <StyledLink key={`slink-${i}`} onClick={() => handleClick(prod)}
            >
              <ProductPicture
                key={`pic-${i}`}
                picture={prod.productPictures}
                prodname={prod.name}
                price={prod.price}
              />
            </StyledLink>
            <button
              key={`btn-${i}`}
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