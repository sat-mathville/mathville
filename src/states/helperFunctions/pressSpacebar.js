export default function pressSpacebar (gameState) {
  const instructions = '(Press spacebar to continue ⇨)'
  gameState.instructions = gameState.add.text(gameState.chatbox.x +350, gameState.chatbox.y + 120, instructions, {
    font: '20px VT323',
    fill: '#060606',
    smoothed: false
  })
}
