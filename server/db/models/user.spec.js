const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  let user1

  before(() => {
    user1 = User.build({
      username: 'cody',
      email: 'cody@email.com',
      password: 'admintesting'
    })
  })

  describe('fields in model', () => {
    it('contains email', () => {
      expect(user1.email).to.equal('cody@email.com')
    })
    it('contains username', () => {
      expect(user1.username).to.equal('cody')
    })
    it('contains default character', () => {
      expect(user1.character).to.equal(1)
    })
  })
})
