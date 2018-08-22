export default (orc) => {
  setInterval(() => {
    if (orc.y >= 540 && orc.x <= 700) {
      orc.y -= 3
      orc.animations.play('walkRight', 20, true)
    } else if (orc.x <= 910 && (orc.y <= 540)) {
      orc.x += 3
      orc.animations.play('walkLeft', 20, true)
    }
  }, 50)
}
