const {expect} = require('chai')
const db = require('../index')
const Question = db.model('question')

describe('Question model', () => {
  let question1

  before(() => {
    question1 = Question.build({
      content: '1 + 1?',
      option1: '1',
      option2: '2',
      option3: '3',
      option4: '4'
    })
  })

  describe('fields in question', () => {
    it('has a content', () => {
      expect(question1.content).to.equal('1 + 1?')
    })
    it('has an option1', () => {
      expect(question1.option1).to.equal('1')
    })
    it('has an option2', () => {
      expect(question1.option2).to.equal('2')
    })
    it('has an option3', () => {
      expect(question1.option3).to.equal('3')
    })
    it('has an option4', () => {
      expect(question1.option4).to.equal('4')
    })
  })
})
