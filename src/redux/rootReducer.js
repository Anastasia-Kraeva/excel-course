import {TABLE_RESIZE, TABLE_ROW_RESIZE} from './types'

export function rootReducer(state, action) {
  let prevState
  let prevRowState

  switch (action.type) {
    case TABLE_RESIZE:
      prevState = state.colState || {}
      prevState[action.data.id] = action.data.value
      return {...state, colState: prevState}
      // return {}
    case TABLE_ROW_RESIZE:
      prevRowState = state.rowState || {}
      prevRowState[action.data.id] = action.data.value
      return {...state, rowState: prevRowState}
    default:
      return state
  }
}
