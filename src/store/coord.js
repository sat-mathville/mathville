// Action types
const SET_COORD = 'SET_COORD'

// Action creators
export const setCoord = coord => ({type: SET_COORD, coord})

// reducer
export default (state = [0, 0], action) => {
  switch (action.type) {
    case SET_COORD: return action.coord
    default: return state
  }
}
