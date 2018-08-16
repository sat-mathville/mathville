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
    if (!(store.getState().userAbilities.has(id))) {
      store.dispatch(addNewAbilityThunk(id))
    }
    gameState.currentQuestionText.destroy()
    for (let key in gameState.buttons) {
      gameState.buttons[key].destroy()
    }
    const finalOutput = gameState.add.text(
        100, 100,
        renderFinalOutput(gameState.score, gameState.questions.length, id
      ), {
      font: '35px',
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
    if (Object.keys(gameState.currentQuestionText).length > 0) {
      gameState.currentQuestionText.destroy()
    }
    gameState.currentQuestion++
    gameState.currentQuestionText = gameState.add.text(
      100,
      100,
      wrap(gameState.questions[gameState.currentQuestion].content, 45),
      {
        font: '35px',
        fill: '#FFFFFF',
        smoothed: false,
        align: 'left'
      })
    gameState.currentQuestionText.inputEnabled = true
    gameState.currentQuestionText.input.useHandCursor = true
    gameState.currentQuestionText.events.onInputDown.add(()=>{renderQuestion(text,gameState)}, gameState)

    console.log(gameState.choice)
    if (!gameState.choice) gameState.choice = gameState.add.text(
      100,
      500,
      'Drag your answer here: _____________',
      {
        font: '35px',
        fill: '#00FF00',
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
        900,
        100 + (i * 50),
        answers[i],
        {
          font: '35px',
          fill: '#FFFF00',
          smoothed: false,
          align: 'left'
        })
      gameState.buttons[i].inputEnabled = true
      gameState.buttons[i].input.enableDrag()
      gameState.buttons[i].events.onInputUp.add(
        () => {
          if (gameState.buttons[i].x > 450 && gameState.buttons[i].x < 650 &&
              gameState.buttons[i].y > 470 && gameState.buttons[i].y < 530) {
                gameState.buttons[i].fill = '#00FF00'
            if (answers[i] === gameState.questions[gameState.currentQuestion].option1) {
              gameState.yay.play()
              setTimeout(() => correctAnswer(text,gameState), 1500)
            } else {
              gameState.scream.play()
              setTimeout(() => renderQuestion(text,gameState), 1500)
            }
          }
        }
      )
    }
  }
}
