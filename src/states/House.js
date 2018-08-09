/* globals __DEV__ */
import Phaser from 'phaser'
import lang from '../lang'

const dummyDataDialogue = [
  'Im Miracle Max',
  'Go away!',
  'Oh wait! I could use your help!',
  'I have these groovy potions to mix'
]

export default class extends Phaser.State {
  init() { }
  preload() {
    this.load.spritesheet('boy', '../assets/images/boy.png',64,64)

  }
  create() {
    const dialogue = lang.text('welcome')
    let banner = this.add.text(200, 200, dialogue, {
      font: '15px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })
    // banner.anchor.setTo(0.5)

    this.boy = this.game.add.sprite(400,350,'boy')
    this.boy.scale.setTo(0.75)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.game.physics.enable(this.boy,Phaser.Physics.ARCADE)
    this.boy.body.collideWorldBounds = true;
    this.camera.follow(this.boy)

    this.boy.animations.add('walkUp', [104,105,106,107,108,109,110,111,112], null, true)
    this.boy.animations.add('walkLeft', [117,118,119,120,121,122,123,124,125], null, true)
    this.boy.animations.add('walkDown', [130,131,132,133,134,135,136,137,138], null, true)
    this.boy.animations.add('walkRight', [143,144,145,146,147,148,149,150,151], null, true)
  }

  update() {
    if(this.cursors.left.isDown){
      this.boy.body.velocity.x = -200
      this.boy.animations.play('walkLeft', 40, true)
    }
    else if(this.cursors.right.isDown){
      this.boy.body.velocity.x = 200
      this.boy.animations.play('walkRight', 40, true)
    }
    else if(this.cursors.up.isDown){
      this.boy.body.velocity.y = -200
      this.boy.animations.play('walkUp', 40, true)
    }
    else if(this.cursors.down.isDown){
      this.boy.body.velocity.y = 200
      this.boy.animations.play('walkDown', 40, true)
    }
    else {
      this.boy.body.velocity.x = 0;
      this.boy.body.velocity.y = 0;
      this.boy.animations.stop();
    }
  }

  render() {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }

}

