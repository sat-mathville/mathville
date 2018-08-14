import axios from 'axios'

// Action types
const GET_ALL_ABILITIES = 'GET_ALL_ABILITIES'

// Action creators
const getAllAbilities = abilities => ({type: GET_ALL_ABILITIES, abilities})

// Thunk creators
export const fetchAllAbilities = async () => dispatch => {
  try {
    const abilities = await axios.get('/api/abilities')
    dispatch(getAllAbilities(abilities))
  } catch (err) {
    console.log(err)
  }
}

// reducer
export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_ABILITIES: return action.abilities
    default: return state
  }
}
