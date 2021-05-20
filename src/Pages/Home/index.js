import axios from "axios"
import { StyledLink } from "./styles"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Cart } from "../../Components/Cart"
import { NavBar } from "../../Components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { ProductPicture } from "../../Components/ProductPicture"
import { addToCart, changeAmount, changeProducts } from "../../store/productReducer"


function useApi() {
  const { products, cart, amount, total } = useSelector(({productReducer}) => ({
    products: productReducer.products,
    total: productReducer.total,
    cart: productReducer.cart,
    amount: productReducer.amount,
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
        const datos = data.map(product => ({...product, amount: 0}))
        dispatch(changeProducts(datos))
      }catch(error) {
        dispatch(setError(error))
      }
    }

    getProducts()

    return () => {
      
    }
  }, [])
  
  return { products, cart, amount, total }
}
  
 export const HomePage = function() {
   const history = useHistory()
   const dispatch = useDispatch()
   
   function handleClick(prod)  {
     history.push(`/productinfo/${prod._id}`)
   }

  const handleAddToCart = function(prod, cart) {
    const isItemInCart = cart.find(product => product._id === prod._id) ? true : false
    if(isItemInCart) {
      return prod.amount = prod.amount + 1
    }
    dispatch(addToCart(prod))
    return prod.amount = 1
  }

    const { products, cart } = useApi()
    console.log(cart)
    return (
      <section>
        <NavBar />
        <Cart />
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
              onClick={() => handleAddToCart(prod, cart)}
            >
              Agregar al carrito
            </button>
          </section>
        ))}
      </section>
    )
}