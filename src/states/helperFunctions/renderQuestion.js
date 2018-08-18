import shuffle from './shuffle'
import store, {addNewAbilityThunk} from '../../store'
import correctAnswer from './correctAnswer'
import renderFinalOutput from './renderFinalOutputMsg'
import wrap from './wrap'

export default function renderQuestion (text, gameState) {
  if (gameState.currentQuestion === -1) {
    text.destroy()
  }
  if (gameState.currentQuestion === gameState.questions.length - 1) {
    if (gameState.choice) {
      gameState.choice.destroy()
      delete gameState.choice
    }
    let id = store.getState().currentAbility
    if (!(store.getState().userAbilities.has(id)) && (gameState.score === gameState.questions.length)) {
      store.dispatch(addNewAbilityThunk(id))
    }
    gameState.currentQuestionText.destroy()
    for (let key in gameState.buttons) {
      gameState.buttons[key].destroy()
    }
    const finalOutput = gameState.add.text(
      gameState.game.camera.width / 2 - 825,
      gameState.game.camera.height / 3,
      renderFinalOutput(gameState.score, gameState.questions.length, id
      ), {
        font: '45px VT323',
        fill: '#FFFFFF',
        smoothed: false,
        align: 'left'
      })
    finalOutput.inputEnabled = true
    finalOutput.input.useHandCursor = true
    finalOutput.events.onInputDown.add(() => {
      gameState.game.state.start('Game')
    }, gameState)
  } else {
    const colors = ['#33ffff', '#33ccff', '#9933ff', '#ff33ff', '#ff99ff']
    if (Object.keys(gameState.currentQuestionText).length > 0) {
      gameState.currentQuestionText.destroy()
      gameState.choice.destroy()
    }
    gameState.currentQuestion++
    gameState.currentQuestionText = gameState.add.text(
      gameState.game.camera.width / 2 - 830,
      gameState.game.camera.height / 6,
      wrap(`${gameState.currentQuestion + 1}. ${gameState.questions[gameState.currentQuestion].content}`, 45),
      {
        font: '35px VT323',
        fill: colors[gameState.currentQuestion],
        smoothed: false,
        align: 'left'
      })
    gameState.currentQuestionText.inputEnabled = true
    gameState.currentQuestionText.input.useHandCursor = true
    gameState.currentQuestionText.events.onInputDown.add(() => { renderQuestion(text, gameState) }, gameState)

    gameState.choice = gameState.add.text(
      gameState.game.camera.width / 2 - 830,
      gameState.game.camera.height / 5 + 500,
      'Drag your answer here: _____________',
      {
        font: '45px VT323',
        fill: colors[gameState.currentQuestion],
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
      gameState.buttons[i] = gameState.add.text(
        gameState.game.camera.width / 2 + 100,
        gameState.game.camera.height / 6 + (i * 50),
        answers[i],
        {
          font: '35px VT323',
          fill: '#FFFFFF',
          smoothed: false,
          align: 'left'
        })
      gameState.buttons[i].inputEnabled = true
      gameState.buttons[i].input.enableDrag()
      gameState.buttons[i].events.onInputUp.add(
        () => {
          if (gameState.buttons[i].x > 450 && gameState.buttons[i].x < 650 &&
              gameState.buttons[i].y > 470 && gameState.buttons[i].y < 530) {
            if (answers[i] === gameState.questions[gameState.currentQuestion].option1) {
              gameState.yay.play()
              gameState.buttons[i].fill = '#00FF00'
              setTimeout(() => correctAnswer(text, gameState), 1500)
            } else {
              gameState.scream.play()
              gameState.buttons[i].fill = '#FF0000'
              setTimeout(() => renderQuestion(text, gameState), 1500)
            }
          }
        }
      )
    }
  }
}
