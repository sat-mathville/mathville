import renderQuestion from './renderQuestion'

export default function correctAnswer (text,gameState) {
  gameState.score++
  renderQuestion(text,gameState)
}
