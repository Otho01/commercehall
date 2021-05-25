import axios from "axios";
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory()

const TRANSACTION_ERROR = 'TRANSACTION_ERROR'
const CHANGE_TRANSACTION = 'CHANGE_TRANSACTION'
const TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS'
const TRANSACTION_SAVING = 'TRANSACTION_SAVING'
const TRANSACTION_FINISHED = 'TRANSACTION_FINISHED'

export function transactionError(value) {
  return {
    type: TRANSACTION_ERROR,
    payload: value,
  }
}

export function changeTransaction(value) {
  return {
    type: CHANGE_TRANSACTION,
    payload: value,
  }
}

export function saveTransaction(transaction) {
  return async function(dispatch) {
    dispatch({ type: TRANSACTION_ERROR, payload: ''})
    dispatch({ type: TRANSACTION_SAVING })
    try {
      const token = localStorage.getItem('token')

      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/transactions',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          transactionDate: transaction.x_fecha_transaccion,
          amountPaid: transaction.x_amount,
          result: transaction.x_transaction_state,
          paymentReference: transaction.x_ref_payco,
        }
      })
      dispatch({ type: TRANSACTION_SUCCESS, payload: data})
    } catch(error) {
      dispatch({ type: TRANSACTION_ERROR, payload: error.message})
      if(!!error.response && error.response.request.status === 401) {
        localStorage.removeItem('token')
        alert('Sesión expirada, ingrese de nuevo')
        history.push('/login')
      }
    } finally {
      dispatch({ type: TRANSACTION_FINISHED})
    }
  }
}

const initialState = {
  saving: false,
  transaction: {},
  error: '',
  success: '',
}

export function transactionReducer(state = initialState, action) {
  switch(action.type) {
    case TRANSACTION_SAVING:
      return {
        ...state,
        saving: true,
      }
    case TRANSACTION_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        success: action.payload.message,
        transaction: action.payload.transaction,
      }
    case TRANSACTION_FINISHED:
      return {
        ...state,
        saving: false,
      }
    default:
      return state
  }
}