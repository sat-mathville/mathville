//input: (string array, current state, next state, array index)
export default function makeChatbox (dialogue, gameState, newState, counter = 0) {
  if (counter < dialogue.length) {
    if (gameState.banner) {
      gameState.banner.destroy()
    }
    gameState.chatbox = gameState.add.sprite(
      (gameState.world.bounds.width - 640) / 4,
      gameState.world.bounds.height / 4,
      'chatbox'
    )
    gameState.chatbox.scale.setTo(2)
    gameState.banner = gameState.add.text(
      gameState.chatbox.x + 20,
      gameState.chatbox.y + 20,
      dialogue[counter],
      {
        font: '35px',
        fill: '#060606',
        smoothed: false
      }
    )
    gameState.banner.inputEnabled = true
    gameState.banner.input.useHandCursor = true
    console.log("We are in chatbox", counter)
    counter++
    gameState.banner.events.onInputDown.add(() => {
      makeChatbox(dialogue, gameState, newState, counter)
    }, gameState)
  } else {
    if (gameState.music) gameState.music.stop()
    gameState.game.state.start(newState)
  }
}
