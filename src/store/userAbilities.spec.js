import {expect} from 'chai'
import reducer, {addNewAbilityThunk, addNewAbility, ADD_NEW_ABILITY} from './userAbilities'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {id:1}


  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('addNewAbilityThunk', () => {
    it('eventually dispatches the addNewAbility action', async () => {
      mockAxios.onPut('/api/abilities/1').replyOnce(200, initialState)
      await store.dispatch(addNewAbilityThunk(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal(ADD_NEW_ABILITY)
      expect(actions[0].newAbilityId).to.be.deep.equal(initialState.id)
    })
  })
})
