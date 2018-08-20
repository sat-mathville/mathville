import {expect} from 'chai'
import shuffle from './helperFunctions/shuffle'

describe('shuffle array', () => {
  let shuffledArray = ['One', 'Two', 'Three', 'Four']
  shuffle(shuffledArray)
  it('The shuffled array is not in original order', () => {
    expect(shuffledArray).to.be.not.deep.equal(['One', 'Two', 'Three', 'Four'])
  })
})
