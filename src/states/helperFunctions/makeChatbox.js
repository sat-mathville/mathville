import wrap from './wrap'

export default function makeChatbox (dialogue, npc, gameState, newState, counter = 0) {
  if (counter < dialogue.length) {
    if (gameState.banner) {
      gameState.banner.destroy()
    }
    console.log(gameState)
    gameState.chatbox = gameState.add.sprite(
      (gameState.world.bounds.width - 320) / 4,
      gameState.world.bounds.height / 4,
      'chatbox'
    )
    gameState.chatbox.scale.setTo(2)
    gameState.banner = gameState.add.text(
      gameState.chatbox.x + 20,
      gameState.chatbox.y + 20,
      '',
      {
        font: '35px',
        fill: '#060606',
        smoothed: false
      }
    )
    gameState.banner.inputEnabled = true
    gameState.banner.input.useHandCursor = true
    gameState.banner.events.onInputDown.add(() => {
      makeChatbox(dialogue, npc, gameState, newState, counter)
    }, gameState)
    const words = wrap(dialogue[counter], 30).split(' ')
    for (let i = 0; i < words.length; i++) {
      setTimeout(() => {
        gameState.banner.text = npc + ': ' + words.slice(0, i + 1).join(' ')
      }, 200 * i)
    }
    counter++
  } else {
    if (newState) {
      if (gameState.music) gameState.music.stop()
      gameState.game.state.start(newState)
    } else {
      gameState.chatbox.destroy()
      delete gameState.chatbox
      gameState.banner.destroy()
      delete gameState.banner
    }
  }
}
