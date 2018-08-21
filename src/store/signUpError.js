import axios from 'axios'

/**
 * ACTION TYPES
 */

export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'

/**
 * ACTION CREATORS
 */

export const signUpError = hasError => ({type: LOGIN_ERROR, hasError})

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
