export default (orc) => {
  setInterval(() => {
    if (orc.y >= 540 && orc.x <= 700) {
      orc.y-=3
      orc.animations.play('walkRight', 20, true)
    } else if (orc.x <= 910 && (orc.y <= 540)) {
      orc.x+=3
      orc.animations.play('walkLeft', 20, true)
    }
  }, 50)
}


// Game.js code

orc.animations.add('walkLeft',[130,131,132,133,134,135,136,137,138],null,true)
orc.animations.add('walkRight',[156,157,158,159,160,161,162,163,164],null,true)
