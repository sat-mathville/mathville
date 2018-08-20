import axios from 'axios'
import { getUserAbilities } from './userAbilities'
import { loginError } from './loginError';

/**
 * ACTION TYPES
 */
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  abilities: []
}

/**
 * ACTION CREATORS
 */
const getUser = data => ({type: GET_USER, data})

const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (data, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, data)
    dispatch(loginError(false))
  } catch (authError) {
    if (authError) { return dispatch(loginError(true)) }
  }
  try {
    dispatch(getUser(res.data || defaultUser))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.data.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
