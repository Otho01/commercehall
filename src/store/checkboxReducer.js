export const CHANGE_VALUE = 'CHANGE_VALUE'
export const CHANGE_ERROR = 'CHANGE_ERROR'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'

export function changeError(value) {
  return {
    type: CHANGE_ERROR,
    payload: value,
  }
}

export function changeValue(value) {
  return {
    type: CHANGE_VALUE,
    payload: value,
  }
}

export function changeCategory(value) {
  return {
    type: CHANGE_CATEGORY,
    payload: value,
  }
}

const initialState = {
  value: '',
  error: '',
  categories: [],
}

export function checkboxReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        value: action.payload,
      }
    case CHANGE_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case CHANGE_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      }
    default:
      return state
  }
}
