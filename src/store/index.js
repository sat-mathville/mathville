import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import questions from './questions'
import user from './user'
import abilities from './abilities'

const reducer = combineReducers({questions, user, abilities})

const logger = createLogger({collapsed: true})

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))

export default store
export * from './questions'
export * from './user'
