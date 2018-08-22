export default (orc) => {
  let counter = 0
  setInterval(() => {
    counter++
    if ((counter%80)<40) {
      orc.x++
      orc.animations.play('walkRight', 10, true)
    } else {
      orc.x--
      orc.animations.play('walkLeft', 10, true)
    }
  }, 50)
}
