const CHANGE_PRODUCTS = 'CHANGE_PRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_AMOUNT = 'CHANGE_AMOUNT'
const CHANGE_TOTAL = 'CHANGE_TOTAL'

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
}

export function productReducer(state = initialSate, action) {
  switch(action.type) {
    case CHANGE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
      case ADD_TO_CART:
        const product = action.payload
        const index = state.cart.find(p => p.product._id === product._id)
        if (index) {
          return {
            ...state,
            cart: state.cart.map(p => p.product._id === product._id ? { product: p.product, amount: p.amount + 1 } : p)
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