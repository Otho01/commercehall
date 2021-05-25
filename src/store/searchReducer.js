const CHANGE_SEARCH = 'CHANGE_SEARCH'

export function changeSearch(value) {
  return {
    type: CHANGE_SEARCH,
    payload: value,
  }
}

const initialState = {
  search: '',
}

export function searchReducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_SEARCH:
      return {
        ...state,
        search: action.payload,
      }
    default:
      return state
  }
}