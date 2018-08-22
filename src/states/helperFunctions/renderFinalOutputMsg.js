import store from '../../store'
import wrap from './wrap'
import Phaser from 'phaser'

export default function renderFinalOutput (gameState) {
  let finalMsg = ''
  const str = '\n\nPress the SPACEBAR to leave.'
  const abilityName = store.getState().abilities.find(ability => ability.id === gameState.id)
  if (gameState.score === gameState.questions.length) {
    if (store.getState().userAbilities.has(gameState.id)) {
      finalMsg = wrap('Good job! But you have done this before. Go somewhere else!', 50) + str
    } else {
      finalMsg = wrap(`Congratulations! You have leveled up! You just got ${abilityName.name}`, 50) + str
    }
  } else {
    finalMsg = wrap(`I'm sorry. You have not answered enough questions correctly. Please come back to get ${abilityName.name.toLowerCase()}.`, 50) + str
  }
  gameState.add.text(
    gameState.game.camera.width / 2 - 825,
    gameState.game.camera.height / 3,
    finalMsg, {
      font: '45px VT323',
      fill: '#FFFFFF',
      smoothed: false,
      align: 'left'
    })
  gameState.spacebar = gameState.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  gameState.spacebar.onDown.add(() => {
    gameState.game.input.keyboard.removeKey(Phaser.KeyCode.SPACEBAR)
    gameState.game.state.start('Game')
  }, gameState)
}
