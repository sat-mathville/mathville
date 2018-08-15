/* globals __DEV__ */
import Phaser from 'phaser'
import store, {addNewAbilityThunk} from '../store'
import renderQuestion from './helperFunctions/renderQuestion'

export default class extends Phaser.State {
  preload () {
    this.load.image('chatbox', '../assets/images/ChatBox.png')
    this.questions = store.getState().questions
  }
  create () {
    this.chatbox = this.game.add.sprite(this.world.centerX - 180, this.world.centerX - 250, 'chatbox')
    this.currentQuestion = -1

    this.buttons = {}
    this.currentQuestionText = {}
    this.score = 0

    const opening = 'start the questions'
    let banner = this.add.text(this.chatbox.x + 200, this.chatbox.y + 150, opening, {
      font: '35px',
      fill: '#000000',
      smoothed: false
    })
    banner.anchor.setTo(0.5)
    banner.inputEnabled = true
    banner.input.useHandCursor = true
    banner.events.onInputDown.add(() => { renderQuestion(banner, this) }, this)
  }
}
