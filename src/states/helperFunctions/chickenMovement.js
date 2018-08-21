export default (chicken) => {
  if (chicken.x===700 && chicken.y>540) {
    chicken.body.velocity.y = -100
    chicken.animations.play('walkUp', 20, true)
  } else if (chicken.x<760 && chicken.y===540) {
    chicken.body.velocity.x = 100
    chicken.animations.play('walkRight', 20, true)
  } else if (chicken.x===760 && chicken.y<600) {
    chicken.body.velocity.y = 100
    chicken.animations.play('walkDown', 20, true)
  } else if (chicken.x>700 && chicken.y===600) {
    chicken.body.velocity.x = -100
    chicken.animations.play('walkLeft', 20, true)
  }
}
