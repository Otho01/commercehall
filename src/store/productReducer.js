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
  products: {},
  cart: [],
  amount: 0,
  total: 0,
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
    case CHANGE_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      }
    case CHANGE_TOTAL:
      return {
        ...state,
        total: action.payload,
      }
    default:
      return state
  }
}