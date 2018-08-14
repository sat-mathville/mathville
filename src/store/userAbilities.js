/**
 * ACTION TYPE
 */
const GET_USER_ABILITIES = 'GET_USER_ABILITIES'

/**
 * ACTION CREATOR
 */
export const getUserAbilities = userAbilities => ({type: GET_USER_ABILITIES, userAbilities})

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_USER_ABILITIES:
      return action.userAbilities
    default:
      return state
  }
}
