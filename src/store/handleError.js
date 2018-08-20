import axios from 'axios'


/**
 * ACTION TYPES
 */

export const GET_ERROR = 'GET_ERROR'

/**
 * ACTION CREATORS
 */

export const getError = errorMsg => ({type: GET_ERROR, errorMsg})

/**
 * REDUCER
 */
export default function (state = '', action) {
  switch (action.type) {
    case GET_ERROR:
      return action.errorMsg
    default:
      return state
  }
}
