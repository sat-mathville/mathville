export default function renderAnswers (gameState) {
  for (let i = 0; i < gameState.answers.length; i++) {
    if (gameState.buttons[i]) {
      gameState.buttons[i].destroy()
    }
    gameState.buttons[i] = gameState.add.text(
      gameState.game.camera.width / 2 + 100,
      gameState.game.camera.height / 6 + (i * 55),
      gameState.answers[i],
      {
        font: '40px VT323',
        fill: '#FFFFFF',
        smoothed: false,
        align: 'left'
      })
  }
}
