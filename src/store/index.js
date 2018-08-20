import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import questions from './questions'
import user from './user'
import abilities from './abilities'
import userAbilities from './userAbilities'
import currentAbility from './currentAbility'
import coord from './coord'
import hasError from './handleError'

const reducer = combineReducers({
  questions,
  user,
  abilities,
  userAbilities,
  currentAbility,
  coord,
  hasError
})

const logger = createLogger({collapsed: true})

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))

export default store
export * from './questions'
export * from './user'
export * from './userAbilities'
export * from './abilities'
export * from './currentAbility'
export * from './coord'
export * from './handleError'
