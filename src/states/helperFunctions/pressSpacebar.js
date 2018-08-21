export default function pressSpacebar (gameState) {
  const instructions = 'Press SPACEBAR to continue ⇨'
  gameState.instructions = gameState.add.text(gameState.chatbox.x +360, gameState.chatbox.y + 120, instructions, {
    font: '20px VT323',
    fill: '#060606',
    smoothed: false
  })
}
