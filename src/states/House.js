/* globals __DEV__ */
import Phaser from 'phaser'
import renderQuestion from './helperFunctions/renderQuestion'
import store from '../store'

export default class extends Phaser.State {
  preload () {
    this.load.audio('yay', '../assets/sounds/yay.m4a')
    this.load.audio('scream', '../assets/sounds/scream.m4a')
    const state = store.getState()
    this.questions = state.questions.filter(
      question => question.abilityId === state.currentAbility
    )
  }
  create () {
    this.yay = this.add.audio('yay')
    this.scream = this.add.audio('scream')
    this.currentQuestion = -1
    this.buttons = {}
    this.currentQuestionText = {}
    this.score = 0

    const opening = 'If you’re ready to answer some questions, click HERE!'
    let banner = this.add.text(100, 100, opening, {
      font: '35px',
      fill: '#FFFFFF',
      smoothed: false
    })
    banner.inputEnabled = true
    banner.input.useHandCursor = true
    banner.events.onInputDown.add(() => { renderQuestion(banner, this) }, this)
  }

  render () {
    this.game.debug.inputInfo(32, 32)
  }
}
