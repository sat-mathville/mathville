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
    this.load.spritesheet('wizard','../assets/images/wizard_idle.png',163,185)
    this.load.tilemap('house', '../assets/images/WizardHouse.csv',null,Phaser.Tilemap.CSV)
    this.load.image('tileset','../assets/images/ProjectUtumno_full.png')
  }
  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0,0,1024,640)
    this.house = this.game.add.tilemap('house')
    this.house.addTilesetImage('tileset')
    this.wizardHouse = this.house.createLayer(0)
    // const dialogue = lang.text('welcome')
    // let banner = this.add.text(200, 200, dialogue, {
    //   font: '15px Bangers',
    //   fill: '#77BFA3',
    //   smoothed: false
    // })
    // banner.anchor.setTo(0.5)

    this.boy = this.game.add.sprite(400,350,'boy')
    this.wizard = this.game.add.sprite(this.world.centerX-250,this.world.centerY+150,'wizard')
    this.boy.scale.setTo(0.75)
    this.wizard.scale.setTo(0.25)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.game.physics.enable(this.boy,Phaser.Physics.ARCADE)
    this.boy.body.collideWorldBounds = true;
    this.camera.follow(this.boy)

    this.boy.animations.add('walkUp', [104,105,106,107,108,109,110,111,112], null, true)
    this.boy.animations.add('walkLeft', [117,118,119,120,121,122,123,124,125], null, true)
    this.boy.animations.add('walkDown', [130,131,132,133,134,135,136,137,138], null, true)
    this.boy.animations.add('walkRight', [143,144,145,146,147,148,149,150,151], null, true)

    this.wizard.animations.add('eyes',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],null,true)
  }

  update() {
    this.wizard.animations.play('eyes',40,true)
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

