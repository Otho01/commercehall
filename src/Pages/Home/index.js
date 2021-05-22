import axios from "axios"
import { StyledLink } from "./styles"
import { useEffect } from "react"
import { handlePayment } from '../../Components/Cart'
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
   
   const dispatch = useDispatch()

   function handlePayment(e) {

    const handler = window.ePayco.checkout.configure({
      key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
      test: true
    })
  
    const data = {
      external: 'false',
      autoclick: 'false',
  
      amount: '20000',
      tax: '0',
      tax_base: '0',
      name: 'carrito de compras',
      description: 'Productos del carrito',
      currency: 'cop',
  
      country: 'CO',
      lang: 'es',
  
      invoice: '1',
  
      // response:
  
     
      email_billing: 'luis@gmail.com',
  
      methodsDisable: [ 'CASH', 'SP', 'PSE', 'DP' ],
    }
  handler.open(data)
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
            <StyledLink key={`slink-${i}`}  to={`/productinfo/${prod._id}`}
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
            <button
              type='button'
              onClick={handlePayment}
            >
              Proceder al pago
            </button>
          </section>
        ))}
      </section>
    )
}