import axios from "axios"

const CHANGE_ADDRESS = 'CHANGE_ADDRESS'
const CHANGE_PHONE = 'CHANGE_PHONE'
const CHANGE_NATID = 'CHANGE_NATID'
const CHANGE_ERROR = 'CHANGE_ERROR'
const USER_INFO_LOADED = 'USER_INFO_LOADED'
const CLIENT_INFO_LOADING = 'CLIENT_INFO_LOADING'
const CLIENT_INFO_ERROR = 'CLIENT_INFO_ERROR'

export function getUser() {
  return async function(dispatch) {
    dispatch({type: CLIENT_INFO_LOADING})
    dispatch({type: CLIENT_INFO_ERROR, payload: ' '})
    try {
      const token = localStorage.getItem('token')

      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/user',
        headers: {
          Authorization: `bearer, ${token}`
        }
      })
      dispatch({type:  USER_INFO_LOADED, payload: data.user})
    }catch(error) {

    }
  }
}


export function changeAddress(value) {
  return {
    type: CHANGE_ADDRESS,
    payload: value,
  }
}

export function changePhone(value) {
  return {
    type: CHANGE_PHONE,
    payload: value,
  }
}

export function changeNatId(value) {
  return {
    type: CHANGE_NATID,
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
  address: '',
  phone: '',
  nationalid: '',
  error: '',
  user: {},
}

export function contactReducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_NATID:
      return {
        ...state,
        nationalid: action.payload,
      }
    case CHANGE_PHONE:
      return {
        ...state,
        phone: action.payload,
      }
    case CHANGE_ADDRESS:
      return {
        ...state,
        address: action.payload,
      }
    case CHANGE_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case USER_INFO_LOADED: 
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}
