import shuffle from './shuffle'
import store, {addNewAbilityThunk} from '../../store'
import renderFinalOutput from './renderFinalOutputMsg'
import wrap from './wrap'
import selectAnswer from './selectAnswer'
import Phaser from 'phaser'
import renderAnswers from './renderAnswers'
import initializeAnswerKeyControls from './initializeAnswerKeyControls'

export default function renderQuestion (text, gameState) {
  if (gameState.currentQuestion === -1) {
    text.destroy()
    initializeAnswerKeyControls(gameState)
  }
  if (gameState.currentQuestion === gameState.questions.length - 1) {
    if (gameState.instruction) {
      gameState.game.input.keyboard.removeKey(Phaser.KeyCode.SPACEBAR)
      gameState.game.input.keyboard.removeKey(Phaser.KeyCode.UP)
      gameState.game.input.keyboard.removeKey(Phaser.KeyCode.DOWN)
      gameState.instruction.destroy()
      delete gameState.instruction
      gameState.rectangle.destroy()
      delete gameState.rectangle
    }
    gameState.id = store.getState().currentAbility
    if (!(store.getState().userAbilities.has(gameState.id)) && (gameState.score === gameState.questions.length)) {
      store.dispatch(addNewAbilityThunk(gameState.id))
    }
    gameState.currentQuestionText.destroy()
    gameState.percentage.destroy()
    for (let key in gameState.buttons) {
      gameState.buttons[key].destroy()
    }
    renderFinalOutput(gameState)
  } else {
    gameState.currentAnswer = 0
    gameState.colors = ['#33ffff', '#33ccff', '#9933ff', '#ff33ff', '#ff99ff']
    if (Object.keys(gameState.currentQuestionText).length > 0) {
      gameState.currentQuestionText.destroy()
      gameState.instruction.destroy()
      gameState.percentage.destroy()
    }
    gameState.currentQuestion++
    gameState.currentQuestionText = gameState.add.text(
      gameState.game.camera.width / 2 - 830,
      gameState.game.camera.height / 6,
      wrap(`${gameState.currentQuestion + 1}. ${gameState.questions[gameState.currentQuestion].content}`, 45),
      {
        font: '40px VT323',
        fill: gameState.colors[gameState.currentQuestion],
        smoothed: false,
        align: 'left'
      })
    const instruction = 'Press the arrow keys ↑↓ to select your answer. Press the spacebar to confirm your answer.'

    gameState.instruction = gameState.add.text(
      gameState.game.camera.width / 2 - 830,
      gameState.game.camera.height / 5 + 400,
      wrap(instruction, 50),
      {
        font: '40px VT323',
        fill: gameState.colors[gameState.currentQuestion],
        smoothed: false,
        align: 'left'
      }
    )

    gameState.percentage = gameState.add.text(
      gameState.game.camera.width / 2 + 50,
      gameState.game.camera.height / 5 + 500,
      `SCORE: ${gameState.score}/${gameState.questions.length}`,
      {
        font: '45px VT323',
        fill: '#29AB87',
        smoothed: false,
        align: 'left'
      }
    )

    gameState.answers = [
      gameState.questions[gameState.currentQuestion].option1,
      gameState.questions[gameState.currentQuestion].option2,
      gameState.questions[gameState.currentQuestion].option3,
      gameState.questions[gameState.currentQuestion].option4
    ]
    shuffle(gameState.answers)

    renderAnswers(gameState)
    selectAnswer(gameState)
    // Register answers

    // gameState.buttons[i].inputEnabled = true
    // gameState.buttons[i].input.enableDrag()
    // gameState.buttons[i].events.onInputUp.add(
    //   () => {
    //     if (gameState.buttons[i].x > gameState.instruction.x + 400 &&
    //         gameState.buttons[i].x < gameState.instruction.x + 600 &&
    //         gameState.buttons[i].y > gameState.instruction.y - 30 &&
    //         gameState.buttons[i].y < gameState.instruction.y + 30) {
    //       if (answers[i] === gameState.questions[gameState.currentQuestion].option1) {
    //         gameState.yay.play()
    //         gameState.buttons[i].fill = '#00FF00'
    //         setTimeout(() => correctAnswer(text, gameState), 1500)
    //       } else {
    //         gameState.scream.play()
    //         gameState.buttons[i].fill = '#FF0000'
    //         setTimeout(() => renderQuestion(text, gameState), 1500)
    //       }
    //     }
    //   }
    // )
  }
}
