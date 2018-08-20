import {expect} from 'chai'
import reducer, {ONE_PROBLEM, FETCH_PROBLEMS,fetchProblems, getProblems} from './questions'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = { questions: [
    {"id": "1",
    "content": "769 + 502 = ?",
    "option1":"1,271",
    "option2":"267",
    "option3":"1,371",
    "option4":"1,471",
    "createdAt":"2018-08-19 17:34:41.525-04",
    "updatedAt": "2018-08-19 17:34:41.642-04",
    "abilityId":"1"}
  ]}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProblems', () => {
    it('eventually dispatches the fetchProblems action', async () => {
      mockAxios.onGet('/api/questions/').replyOnce(200, initialState.questions)
      await store.dispatch(getProblems())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal(FETCH_PROBLEMS)
      expect(actions[0].problems[0]).to.be.deep.equal(initialState.questions[0])
    })
  })
})
