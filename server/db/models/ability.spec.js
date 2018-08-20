const {expect} = require('chai')
const db = require('../index')
const Ability = db.model('ability')

describe("Ability Model", () => {
  let ability1

  before(() => {
    ability1 = Ability.build({
    name: 'fire power',
    type: 'magic',
    image: 'potion'
    })
  })

  describe('fields in ability', () => {
    it('has a name', () => {
    expect(ability1.name).to.equal('fire power')
    })

    it('has a type', () => {
      expect(ability1.type).to.equal('magic')
    })

    it('has an image url', () => {
      expect(ability1.image).to.equal('potion')
    })

    it('has a default value 0', () => {
      expect(ability1.value).to.equal(0)
    })
  })
})
