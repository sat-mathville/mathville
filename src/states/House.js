/* globals __DEV__ */
import Phaser from 'phaser'
import store, {addNewAbilityThunk} from '../store'
import renderFinalOutput from './helperFunctions/renderFinalOutputMsg'

export default class extends Phaser.State {
  init () { }
  preload () {
    this.load.image('chatbox', '../assets/images/ChatBox.png')
    this.load.image('checkbox', 'https://icon2.kisspng.com/20180619/vov/kisspng-checkbox-rectangle-square-computer-icons-clip-art-checkboxes-5b298c2babb9f3.4618111415294495157034.jpg')
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

    banner.events.onInputDown.add(this.renderQuestion, this)
  }

  update () {
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }

  renderQuestion (text) {
    if (this.currentQuestion === -1) {
      text.destroy()
    }
    if (this.currentQuestion === this.questions.length - 1) {
      let id = 2
      if (!(store.getState().userAbilities.find(ability => ability === id))) {
        store.dispatch(addNewAbilityThunk(id))
      }
      this.currentQuestionText.destroy()
      for (let key in this.buttons) {
        this.buttons[key].destroy()
      }
      const finalOutput = this.add.text(this.chatbox.x + 200, this.chatbox.y + 150, renderFinalOutput(this.score,this.questions.length), {
        font: '35px',
        fill: '#000000',
        smoothed: false
      })
      finalOutput.inputEnabled = true
      finalOutput.input.useHandCursor = true
      finalOutput.events.onInputDown.add(() => {
        this.game.state.start('Game')
      }, this)
    } else {
      if (Object.keys(this.currentQuestionText).length > 0) {
        this.currentQuestionText.destroy()
      }
      this.currentQuestion++
      this.currentQuestionText = this.add.text(this.chatbox.x + 200, this.chatbox.y + 150, this.questions[this.currentQuestion].content, {
        font: '35px',
        fill: '#000000',
        smoothed: false
      })

      console.log(this.currentQuestionText, 'TEST')

      this.currentQuestionText.anchor.setTo(0.5)
      this.currentQuestionText.inputEnabled = true
      this.currentQuestionText.input.useHandCursor = true
      this.currentQuestionText.events.onInputDown.add(this.renderQuestion, this)

      let answers = []

      answers.push(this.questions[this.currentQuestion].option1)
      answers.push(this.questions[this.currentQuestion].option2)
      answers.push(this.questions[this.currentQuestion].option3)
      answers.push(this.questions[this.currentQuestion].option4)

      function shuffle (answers) {
        for (let i = answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [answers[i], answers[j]] = [answers[j], answers[i]]
        }
        return answers
      }

      shuffle(answers)

      for (let i = 0; i < answers.length; i++) {
        if (this.buttons[i]) {
          this.buttons[i].destroy()
        }
        this.buttons[i] = this.add.text(this.chatbox.x + 230, this.chatbox.y + 200 + (i * 50), answers[i], {
          font: '25px',
          fill: '#000000',
          smoothed: false
        })
        this.buttons[i].inputEnabled = true
        this.buttons[i].input.useHandCursor = true
        if (answers[i] === this.questions[this.currentQuestion].option1) {
          this.buttons[i].events.onInputDown.add(this.correctAnswer, this)
        } else {
          this.buttons[i].events.onInputDown.add(this.renderQuestion, this)
        }
      }
    }
  }

  correctAnswer () {
    console.log('woohoo you got it!')
    this.score++
    this.renderQuestion()
  }
}
