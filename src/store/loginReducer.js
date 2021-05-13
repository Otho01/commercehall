const CHANGE_EMAIL = 'CHANGE_EMAIL'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const CHANGE_ERROR = 'CHANGE_ERROR'

export function changeEmail(value) {
  return{
    type: CHANGE_EMAIL,
    payload: value,
  }
}

export function changePassword(value) {
  return{
    type: CHANGE_PASSWORD,
    payload: value,
  }
}

export function changeError(value) {
  return {
    type: CHANGE_ERROR,
    payload: value,
  }
}

const initialState = {
  password: '',
  email: '',
  error: '',
}

export function loginReducer(state = initialState, action) {
  switch(action.type){
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
    case CHANGE_ERROR:
      return {
        ...state,
        error: 'Usuario o contraseña iválida'
      }
    default:
      return state
  }
}