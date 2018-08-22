export default (chicken) => {
  setInterval(() => {
    if (chicken.x === 700 && chicken.y > 420) {
      chicken.y -= 3
    }
    if (chicken.x < 990 && chicken.y === 420) {
      chicken.x += 3
    }
    if (chicken.x === 990 && chicken.y < 600) {
      chicken.y += 3
    }
    if (chicken.x > 700 && chicken.y === 600) {
      chicken.x -= 3
    }
    if (chicken.x === 700 && chicken.y === 600) {
      console.log('1st if statement')
      chicken.animations.play('walkUp', 20, true)
    }
    if (chicken.x === 700 && chicken.y === 420) {
      console.log('2nd if statement')
      chicken.animations.play('walkRight', 20, true)
    }
    if (chicken.x === 990 && chicken.y === 420) {
      chicken.animations.play('walkDown', 20, true)
    }
    if (chicken.x === 990 && chicken.y===600) {
      console.log('4th if statement')
      chicken.animations.play('walkLeft', 20, true)
    }

  }, 50)
}
