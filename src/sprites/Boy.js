import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    // this.anchor.setTo(0.5)
  }

  create () {
    this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 1, true)
    // this.animations.add('up', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, true)
    // this.animations.add('walk')

    // this.cursors =
  }

  update () {
    console.log('THIS',this)
    // this.angle += -1
    this.animations.play('walk', 5, true)
    // if (this.cursors.left.isDown) {
    //   this.animations.play('left')
    //   console.log('TEST left')
    // } else if (this.cursors.up.isDown) {
    //   this.animations.play('up')
    // }
  }
}
