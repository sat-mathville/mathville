import wrap from './wrap'
import { Key } from 'phaser-ce';

export default function instructionsChat (dialogue, gameState, counter = 0) {
  console.log('dialogue', dialogue)
  if (!counter) {
    gameState.spacebar = gameState.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    gameState.spacebar.onDown.add(() => {
      counter++
      instructionsChat(dialogue, gameState,counter)
    }, gameState)

  }
  console.log('banner', gameState.banner)
  if (counter < dialogue.length) {
    if (gameState.banner) {
      gameState.chatbox.destroy()
      delete gameState.chatbox
      gameState.banner.destroy()
      delete gameState.banner
    }
    gameState.chatbox = gameState.add.sprite(
      gameState.camera.x + gameState.camera.width / 4,
      gameState.camera.y + gameState.camera.height / 6,
      'instructionsBox'
    )
    gameState.chatbox.scale.setTo(1.5)
    gameState.banner = gameState.add.text(
      gameState.chatbox.x + 70,
      gameState.chatbox.y + 70,
      dialogue[counter],
      {
        font: '40px Kalam',
        fill: '#060606',
        smoothed: false
      }
    )
    
  } else {
    gameState.game.input.keyboard.removeKey(Phaser.KeyCode.SPACEBAR)
      gameState.chatbox.destroy()
      delete gameState.chatbox
      gameState.banner.destroy()
      delete gameState.banner
    
  }
}
