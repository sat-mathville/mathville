import {expect} from 'chai'
import reducer, {GET_ALL_ABILITIES, fetchAllAbilities} from './abilities'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = { abilities: [
    { 'id': '1',
      'name': 'Magic potion',
      'type': 'magic',
      'image': 'potion',
      'value': '5'
    }
  ]}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchAllAbilities', () => {
    it('eventually dispatches the getAllAbilities action', async () => {
      mockAxios.onGet('/api/abilities').replyOnce(200, initialState.abilities)
      await store.dispatch(fetchAllAbilities())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal(GET_ALL_ABILITIES)
      expect(actions[0].abilities[0]).to.be.deep.equal(initialState.abilities[0])
    })
  })
})
