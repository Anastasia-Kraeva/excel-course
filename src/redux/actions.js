import {TABLE_RESIZE, TABLE_ROW_RESIZE} from './types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function tableRowResize(data) {
  return {
    type: TABLE_ROW_RESIZE,
    data
  }
}