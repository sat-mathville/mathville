export default (chicken) => {
  setInterval(() => {
    if (chicken.y >= 540 && chicken.x <= 700) {
      console.log('1st if statement')
      chicken.y-=3
      chicken.animations.play('walkUp', 20, true)
    } else if (chicken.x <= 910 && (chicken.y <= 540)) {
      console.log('2nd if statement')
      chicken.x+=3
      chicken.animations.play('walkRight', 20, true)
    } else if ((chicken.x >= 910) && chicken.y <= 600) {
      chicken.y +=3
      chicken.animations.play('walkDown', 20, true)
    } else if (chicken.x >= 700 && (chicken.y >= 600 && chicken.y <= 610)) {
      console.log('4th if statement')
      chicken.x-=3
      chicken.animations.play('walkLeft', 20, true)
    }
  }, 50)
}
