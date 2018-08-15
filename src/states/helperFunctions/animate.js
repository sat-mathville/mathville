export default sprite => {
  sprite.scale.setTo(0.75)
  sprite.animations.add('walkUp', [104, 105, 106, 107, 108, 109, 110, 111, 112], null, true)
  sprite.animations.add('walkLeft', [117, 118, 119, 120, 121, 122, 123, 124, 125], null, true)
  sprite.animations.add('walkDown', [130, 131, 132, 133, 134, 135, 136, 137, 138], null, true)
  sprite.animations.add('walkRight', [143, 144, 145, 146, 147, 148, 149, 150, 151], null, true)
  sprite.body.collideWorldBounds = true
}
