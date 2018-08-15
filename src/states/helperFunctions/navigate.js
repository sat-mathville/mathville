export default (cursors, sprite) => {
  if (cursors.left.isDown) {
    sprite.body.velocity.x = -200
    sprite.animations.play('walkLeft', 40, true)
  } else if (cursors.right.isDown) {
    sprite.body.velocity.x = 200
    sprite.animations.play('walkRight', 40, true)
  } else if (cursors.up.isDown) {
    sprite.body.velocity.y = -200
    sprite.animations.play('walkUp', 40, true)
  } else if (cursors.down.isDown) {
    sprite.body.velocity.y = 200
    sprite.animations.play('walkDown', 40, true)
  } else {
    sprite.body.velocity.x = 0
    sprite.body.velocity.y = 0
    sprite.animations.stop()
  }
}
