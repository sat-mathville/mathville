/* globals __DEV__ */
import Phaser from 'phaser'
import renderQuestion from './helperFunctions/renderQuestion'
import store from '../store'

export default class extends Phaser.State {
  preload () {
    const state = store.getState()
    this.questions = state.questions.filter(
      question => question.abilityId === state.currentAbility
    )
  }
  create () {
    this.currentQuestion = -1
    this.buttons = {}
    this.currentQuestionText = {}
    this.score = 0

    const opening = 'Ready to answer some questions?'
    let banner = this.add.text(this.world.centerX, this.world.centerY, opening, {
      font: '35px',
      fill: '#FFFFFF',
      smoothed: false
    })
    banner.inputEnabled = true
    banner.input.useHandCursor = true
    banner.events.onInputDown.add(() => { renderQuestion(banner, this) }, this)
  }
}
