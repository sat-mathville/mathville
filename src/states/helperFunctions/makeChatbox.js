import wrap from './wrap'
import Phaser from 'phaser'
import pressSpacebar from './pressSpacebar'
import updateAbilities from './updateAbilities'

export default function makeChatbox (dialogue, npc, gameState, newState, counter = 0) {
  if (!counter) {
    gameState.spacebar = gameState.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    gameState.spacebar.onDown.add(() => {
      counter++
      makeChatbox(dialogue, npc, gameState, newState, counter)
    }, gameState)
    if (!newState) {
      const sound = gameState.add.audio(npc)
      sound.play()
    }
  }
  if (counter < dialogue.length) {
    if (gameState.banner) {
      gameState.chatbox.destroy()
      delete gameState.chatbox
      gameState.banner.destroy()
      delete gameState.banner
      gameState.instructions.destroy()
      delete gameState.instructions
    }
    gameState.chatbox = gameState.add.sprite(
      gameState.camera.x + gameState.camera.width / 3,
      gameState.camera.y + gameState.camera.height / 3,
      'chatbox'
    )
    gameState.chatbox.scale.setTo(2)
    gameState.banner = gameState.add.text(
      gameState.chatbox.x + 20,
      gameState.chatbox.y + 20,
      '',
      {
        font: '40px VT323',
        fill: '#060606',
        smoothed: false
      }
    )

    const words = wrap(dialogue[counter], 25).split(' ')
    for (let i = 0; i < words.length; i++) {
      setTimeout(() => {
        gameState.banner.text = npc + ': ' + words.slice(0, i + 1).join(' ')
        if(i===words.length-1)pressSpacebar(gameState)
      }, 200 * i)
    }

  } else {
    gameState.game.input.keyboard.removeKey(Phaser.KeyCode.SPACEBAR)
    if (newState) {
      if (gameState.music) gameState.music.stop()
      gameState.game.state.start(newState)
    } else {
      updateAbilities(npc, gameState)
      gameState.chatbox.destroy()
      delete gameState.chatbox
      gameState.banner.destroy()
      delete gameState.banner
      gameState.instructions.destroy()
      delete gameState.instructions
    }
  }
}
