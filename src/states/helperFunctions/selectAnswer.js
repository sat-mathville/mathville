export default function selectAnswer (gameState) {
  if (!gameState.rectangle) {
    let rectangle = '┌────────┐\n└────────┘'
    gameState.rectangle = gameState.add.text(
      gameState.buttons[gameState.currentAnswer].x - 20,
      gameState.buttons[gameState.currentAnswer].y - 20,
      rectangle,
      {
        font: '40px VT323',
        fill: gameState.colors[gameState.currentQuestion],
        smoothed: false,
        align: 'left'
      })
  } else {
    console.log('X coordinate of buttons', gameState.buttons, gameState.currentAnswer)
    gameState.rectangle.x = gameState.buttons[gameState.currentAnswer].x-20
    gameState.rectangle.y = gameState.buttons[gameState.currentAnswer].y-20
    gameState.rectangle.fill = gameState.colors[gameState.currentQuestion]
  }
}
