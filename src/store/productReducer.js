const CHANGE_PRODUCTS = 'CHANGE_PRODUCTS'

export function changeProducts(value){
  return {
    type: CHANGE_PRODUCTS,
    payload: value,
  }
}

const initialSate = {
  products: {},
}

export function productReducer(state = initialSate, action) {
  switch(action.type) {
    case CHANGE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    default:
      return state
  }
}