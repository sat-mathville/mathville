import shuffle from './shuffle'
import store, {addNewAbilityThunk} from '../../store'
import correctAnswer from './correctAnswer'
import renderFinalOutput from './renderFinalOutputMsg'

export default function renderQuestion (text, gameState) {
  if (gameState.currentQuestion === -1) {
    text.destroy()
  }
  if (gameState.currentQuestion === gameState.questions.length - 1) {
    let id = 2
    if (!(store.getState().userAbilities.find(ability => ability === id))) {
      store.dispatch(addNewAbilityThunk(id))
    }
    gameState.currentQuestionText.destroy()
    for (let key in gameState.buttons) {
      gameState.buttons[key].destroy()
    }
    const finalOutput = gameState.add.text(gameState.chatbox.x + 200, gameState.chatbox.y + 150, renderFinalOutput(gameState.score, gameState.questions.length), {
      font: '35px',
      fill: '#000000',
      smoothed: false
    })
    finalOutput.inputEnabled = true
    finalOutput.input.useHandCursor = true
    finalOutput.events.onInputDown.add(() => {
      gameState.game.state.start('Game')
    }, gameState)
  } else {
    if (Object.keys(gameState.currentQuestionText).length > 0) {
      gameState.currentQuestionText.destroy()
    }
    gameState.currentQuestion++
    gameState.currentQuestionText = gameState.add.text(gameState.chatbox.x + 200, gameState.chatbox.y + 150, gameState.questions[gameState.currentQuestion].content, {
      font: '35px',
      fill: '#000000',
      smoothed: false
    })
    gameState.currentQuestionText.anchor.setTo(0.5)
    gameState.currentQuestionText.inputEnabled = true
    gameState.currentQuestionText.input.useHandCursor = true
    gameState.currentQuestionText.events.onInputDown.add(()=>{renderQuestion(text,gameState)}, gameState)

    let answers = [
      gameState.questions[gameState.currentQuestion].option1,
      gameState.questions[gameState.currentQuestion].option2,
      gameState.questions[gameState.currentQuestion].option3,
      gameState.questions[gameState.currentQuestion].option4
    ]
    shuffle(answers)

    for (let i = 0; i < answers.length; i++) {
      if (gameState.buttons[i]) {
        gameState.buttons[i].destroy()
      }
      gameState.buttons[i] = gameState.add.text(gameState.chatbox.x + 230, gameState.chatbox.y + 200 + (i * 50), answers[i], {
        font: '25px',
        fill: '#000000',
        smoothed: false
      })
      gameState.buttons[i].inputEnabled = true
      gameState.buttons[i].input.useHandCursor = true
      if (answers[i] === gameState.questions[gameState.currentQuestion].option1) {
        gameState.buttons[i].events.onInputDown.add(() => { correctAnswer(text, gameState) }, gameState)
      } else {
        gameState.buttons[i].events.onInputDown.add(() => { renderQuestion(text, gameState) }, gameState)
      }
    }
  }
}