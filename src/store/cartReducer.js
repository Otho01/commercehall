const CHANGE_PRODUCTS = 'CHANGE_PRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_AMOUNT = 'CHANGE_AMOUNT'
const CHANGE_TOTAL = 'CHANGE_TOTAL'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const OPEN_CLOSE_CART = 'OPEN_CLOSE_CART'

export function openCloseCart(value) {
  return {
    type: OPEN_CLOSE_CART,
    payload: value,
  }
}

export function removeFromCart(value) {
  return {
    type: REMOVE_FROM_CART,
    payload: value,
  }
}

export function changeTotal(value) {
  return {
    type: CHANGE_TOTAL,
    payload: value,
  }
}

export function changeAmount(value) {
  return {
    type: CHANGE_AMOUNT,
    payload: value,
  }
}

export function changeProducts(value) {
  return {
    type: CHANGE_PRODUCTS,
    payload: value,
  }
}

export function addToCart(value) {
  return {
    type: ADD_TO_CART,
    payload: value,
  }
}
const initialSate = {
  products: [],
  cart: [],
  openCart: false,
}

export function cartReducer (state = initialSate, action) {
  switch(action.type) {
    case CHANGE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case OPEN_CLOSE_CART:
      return {
        ...state,
        openCart: action.payload,
      }
    case ADD_TO_CART:
      const product = action.payload
      const index = state.cart.find(p => !!p.product && p.product._id === product._id)
      if (index) {
        return {
          ...state,
          cart: state.cart.map(p => !!p.product && p.product._id === product._id ? { product: p.product, amount: p.amount + 1 } : p)
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, { product, amount: 1 }]
        }
      }
    case REMOVE_FROM_CART:
      const prodInCart = action.payload
      const isInCart = state.cart.find(p => !!p.product && p.product._id === prodInCart.product._id)
      if (isInCart) {
        return {
          ...state,
          cart: state.cart.map((p, i) => !!p.product && p.product._id === prodInCart.product._id && p.amount > 1 
            ? { product: !!p.product && p.product, amount: p.amount -1 } 
            : !!p.product && p.product._id === prodInCart.product._id && p.amount === 1 ? state.cart.splice(i, 1) : p)
        }
      } else {
          return {
          ...state,
          cart: [...state.cart, { product, amount: 1 }]
        }
      }
    default:
      return state
}
}