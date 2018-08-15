
import Phaser from 'phaser'
import store from '../store'

export default class extends Phaser.State {
  preload () {
    const userCharacter = () => {
      if (store.getState().user.character === 1) return '../assets/images/boy.png'
      else if (store.getState().user.character === 2) return '../assets/images/girl.png'
      else if (store.getState().user.character === 3) return '../assets/images/cat_fighter_sprite1.png'
    }
    this.load.spritesheet('boy', userCharacter(), 64, 64)
    this.load.tilemap('ground', '../assets/images/forest_ground1.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('holes', '../assets/images/forest_holes2.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('trees', '../assets/images/forest_trees3.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('creature', '../assets/images/forest_creature4.csv', null, Phaser.Tilemap.CSV)
    this.load.image('tileset', '../assets/images/ProjectUtumno_full.png')
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 960, 960)

    this.ground = this.game.add.tilemap('ground')
    this.ground.addTilesetImage('tileset')
    this.forestGround = this.ground.createLayer(0)

    this.holes = this.game.add.tilemap('holes')
    this.holes.addTilesetImage('tileset')
    this.forestHoles = this.holes.createLayer(0)

    this.trees = this.game.add.tilemap('trees')
    this.trees.addTilesetImage('tileset')
    this.forestTrees = this.trees.createLayer(0)
    this.game.physics.arcade.enable(this.trees)
    this.trees.setCollisionBetween(0, 6080, true, this.forestTrees)

    this.creature = this.game.add.tilemap('creature')
    this.creature.addTilesetImage('tileset')
    this.forestCreature = this.creature.createLayer(0)
    this.game.physics.arcade.enable(this.creature)
    this.creature.setCollisionBetween(0, 6080, true, this.forestCreature)

    this.boy = this.game.add.sprite(this.world.centerX - 50, this.world.centerY, 'boy')
    this.boy.scale.setTo(0.75)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.game.physics.enable(this.boy, Phaser.Physics.ARCADE)
    this.boy.body.collideWorldBounds = true
    this.camera.follow(this.boy)

    this.boy.animations.add('walkUp', [104, 105, 106, 107, 108, 109, 110, 111, 112], null, true)
    this.boy.animations.add('walkLeft', [117, 118, 119, 120, 121, 122, 123, 124, 125], null, true)
    this.boy.animations.add('walkDown', [130, 131, 132, 133, 134, 135, 136, 137, 138], null, true)
    this.boy.animations.add('walkRight', [143, 144, 145, 146, 147, 148, 149, 150, 151], null, true)

  }

  update () {
    this.game.physics.arcade.collide(this.boy, this.forestTrees)
    this.game.physics.arcade.collide(this.boy, this.forestCreature)
    // this.game.physics.arcade.overlap(this.boy, this.wizard, () => {
    //   this.game.state.start('House')
    // }, null, this)

    if (this.cursors.left.isDown) {
      this.boy.body.velocity.x = -200
      this.boy.animations.play('walkLeft', 40, true)
    } else if (this.cursors.right.isDown) {
      this.boy.body.velocity.x = 200
      this.boy.animations.play('walkRight', 40, true)
    } else if (this.cursors.up.isDown) {
      this.boy.body.velocity.y = -200
      this.boy.animations.play('walkUp', 40, true)
    } else if (this.cursors.down.isDown) {
      this.boy.body.velocity.y = 200
      this.boy.animations.play('walkDown', 40, true)
    } else {
      this.boy.body.velocity.x = 0
      this.boy.body.velocity.y = 0
      this.boy.animations.stop()
    }
  }
}
