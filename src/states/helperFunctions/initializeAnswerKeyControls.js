import Phaser from 'phaser'
import selectAnswer from './selectAnswer'
import renderQuestion from './renderQuestion'
import correctAnswer from './correctAnswer'

export default function initializeAnswerKeyControls (gameState) {
  // Enable up, down and spacebar for answers
  gameState.game.input.keyboard.removeKey(Phaser.KeyCode.SPACEBAR)
  gameState.spacebar = gameState.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  gameState.upArrow = gameState.game.input.keyboard.addKey(Phaser.Keyboard.UP)
  gameState.downArrow = gameState.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
  gameState.spacebar.onDown.add(() => {
    if (gameState.answers[gameState.currentAnswer] === gameState.questions[gameState.currentQuestion].option1) {
      gameState.yay.play()
      gameState.buttons[gameState.currentAnswer].fill = '#00FF00'
      setTimeout(() => correctAnswer(null, gameState), 1500)
    } else {
      gameState.scream.play()
      gameState.buttons[gameState.currentAnswer].fill = '#FF0000'
      setTimeout(() => renderQuestion(null, gameState), 1500)
    }
  }, gameState)
  gameState.downArrow.onDown.add(() => {
    if (gameState.currentAnswer < 3) {
      gameState.currentAnswer++
      selectAnswer(gameState)
    }
  }, gameState)
  gameState.upArrow.onDown.add(() => {
    if (gameState.currentAnswer > 0) {
      gameState.currentAnswer--
      selectAnswer(gameState)
    }
  }, gameState)
}
