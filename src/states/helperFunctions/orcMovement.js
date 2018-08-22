export default (orc) => {
  let counter = 0
  setInterval(() => {
    counter++
    if ((counter%80)<40) {
      console.log('1st condition')
      orc.x += 5
      orc.animations.play('walkRight', 10, true)
    } else {
      console.log('2nd condition', orc.x, orc.y)
      orc.x -= 5
      orc.animations.play('walkLeft', 10, true)
    }
  }, 50)
}
