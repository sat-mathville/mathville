import axios from 'axios'
import {GET_USER} from './user'

/**
 * ACTION TYPE
 */
const GET_USER_ABILITIES = 'GET_USER_ABILITIES'
const ADD_NEW_ABILITY = 'ADD_NEW_ABILITY'

/**
 * ACTION CREATOR
 */
export const getUserAbilities = userAbilities => ({type: GET_USER_ABILITIES, userAbilities})

export const addNewAbility = newAbilityId => ({
  type: ADD_NEW_ABILITY,
  newAbilityId
})

/**
 * THUNK CREATOR
 */
export const addNewAbilityThunk = (newAbilityId) => async dispatch => {
  try{
    const {data} = await axios.put(`/api/abilities/${newAbilityId}`)
    dispatch(addNewAbility(data.id))
  } catch (error) {
    console.error(error)
  }

}


/**
 * REDUCER
 */
export default function (state = new Set([]), action) {
  switch (action.type) {
    case GET_USER:
      return new Set(action.data.abilities)
    case ADD_NEW_ABILITY:
      return state.add(action.newAbilityId)
    default:
      return state
  }
}
