import axios from 'axios'

// ACTION TYPES
export const FETCH_PROBLEMS = 'FETCH_PROBLEMS'
export const ONE_PROBLEM = 'ONE_PROBLEM'

const initialState = []

// ACTION CREATORS

// everytime we get problems what we're really doing is getting specific problems for that building

const fetchProblems = (problems) => ({
  type: FETCH_PROBLEMS,
  problems
})

// THUNKS

export const getProblems = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/questions/`)
      const problems = res.data
      dispatch(fetchProblems(problems))
    } catch (err) { console.log(err) }
  }
}

// REDUCER

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROBLEMS:
      return action.problems
    default:
      return state
  }
}
