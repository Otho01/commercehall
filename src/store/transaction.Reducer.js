import axios from "axios";
const TRANSACTION_ERROR = 'TRANSACTION_ERROR'

export function getTransaction() {
  return async function(dispatch) {
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: '/transactions',
        url: process.env.REACT_APP_SERVER_URL,
      })
    } catch(error) {
      dispatch(changeError())
    }
  }
}