import axios from 'axios'

//ACTION TYPES
export const FETCH_PROBLEMS = 'FETCH_PROBLEMS'

const initialState = {
    allProblems = [],
    specificProbs = {}
}

//ACTION CREATORS

const fetchProblems = (problems) => ({
    type: FETCH_PROBLEMS,
    problems
})

//THUNKS

export const getProblems = (type) => {
    return async (dispatch)  => {
        try {
            const res = await axios.get(`/api/questions/${type}`)
            const specificProbs = res.data
            dispatch(fetchProblems(specificProbs))
        } catch(err){
            console.log(err)
        }
    }
}

//REDUCER

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_PROBLEMS:
            return {...state, specificProbs: action.problems}
        default: 
            return state
    }
}