
import Phaser from 'phaser'
import makeChatbox from './helperFunctions/makeChatbox'
import store, {setCurrentAbilityId} from '../store'
import spriteUrl from './helperFunctions/spriteUrl'

export default class extends Phaser.State {
  preload () {
    store.dispatch(setCurrentAbilityId(4))
    this.load.spritesheet('boy', spriteUrl(), 64, 64)
    this.load.tilemap('ground', '../assets/images/forest_ground1.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('holes', '../assets/images/forest_holes2.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('trees', '../assets/images/forest_trees3.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('creature', '../assets/images/forest_creature4.csv', null, Phaser.Tilemap.CSV)
    this.load.image('tileset', '../assets/images/ProjectUtumno_full.png')

    this.load.spritesheet('villain', '../assets/images/villain_idle.png', 80, 80)

    this.load.image('chatbox', '../assets/images/chatbox.jpg')

    //music
    this.load.audio('music', '../assets/sounds/foggywoods.mp3');
  }

  create () {

    //music
    this.music = this.add.audio('music')
    this.music.play()

    this.overlap = false
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

    this.villain = this.game.add.sprite(20, 20, 'villain')
    this.villain.scale.setTo(1)
    this.game.physics.enable(this.villain, Phaser.Physics.ARCADE)
    this.villain.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], null, true)

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
    this.villain.animations.play('idle', 20, true)
    this.game.physics.arcade.overlap(this.boy, this.villain, () => {
      if (!this.overlap) {
        makeChatbox(["I'm a villain", "Answer this"], this, "House")
        this.overlap = true
        // this.music.stop()
      }
    }, null, this)

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

  render(){
    this.game.debug.soundInfo(this.music, 20, 32)
  }
}
