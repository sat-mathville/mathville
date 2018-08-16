// Action types
const SET_CURRENT_ABILITY_ID = 'SET_CURRENT_ABILITY_ID'

// Action creators
export const setCurrentAbilityId = abilityId => ({type: SET_CURRENT_ABILITY_ID, abilityId})

// reducer
export default (state = 0, action) => {
  switch (action.type) {
    case SET_CURRENT_ABILITY_ID: return action.abilityId
    default: return state
  }
}
