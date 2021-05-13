import { createStore, combineReducers, applyMiddleware } from 'redux'
import { signUpReducer } from './signUpReducer'
import { loginReducer } from './loginReducer'
import { checkboxReducer } from './checkboxReducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const appReducer = combineReducers({
  signUpReducer,
  loginReducer,
  checkboxReducer,
})

const rootReducer = (state, action) => {
  if(action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)