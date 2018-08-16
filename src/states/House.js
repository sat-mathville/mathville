/* globals __DEV__ */
import Phaser from 'phaser'
import store from '../store'
import renderQuestion from './helperFunctions/renderQuestion'

export default class extends Phaser.State {
  preload () {
    this.questions = store.getState().questions
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
    // banner.anchor.setTo(0.5)
    banner.inputEnabled = true
    banner.input.useHandCursor = true
    banner.events.onInputDown.add(() => { renderQuestion(banner, this) }, this)
  }
}
