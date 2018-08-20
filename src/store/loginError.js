import axios from 'axios'


/**
 * ACTION TYPES
 */

export const LOGIN_ERROR = 'LOGIN_ERROR'

/**
 * ACTION CREATORS
 */

export const loginError = hasError => ({type: LOGIN_ERROR, hasError})

/**
 * REDUCER
 */
export default function (state = false, action) {
  switch (action.type) {
    case LOGIN_ERROR:
    console.log('ACTION',action)
      return action.hasError
    default:
      return state
  }
}
