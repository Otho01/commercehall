const CHANGE_PRODUCTS = 'CHANGE_PRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'

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
  products: {},
  cart: [],
  amount: 0,
}

export function productReducer(state = initialSate, action) {
  switch(action.type) {
    case CHANGE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case ADD_TO_CART:
      return {
        ...state,
        cart: [
          ...state.cart,
          action.payload
        ]
      }
    default:
      return state
  }
}