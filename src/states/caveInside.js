import Phaser from 'phaser'
import makeChatbox from './helperFunctions/makeChatbox'
import spriteUrl from './helperFunctions/spriteUrl'
export default class extends Phaser.State {
  preload () {
    // characters
    this.load.spritesheet('boy', spriteUrl(), 64, 64)
    this.load.spritesheet('kitten', '../assets/images/characters/cat_fighter_sprite2.png', 50, 50)

    // add ogre here?
    // tilesheets
    this.load.image('caveSet', '../assets/images/caveInside/cave.png')
    // tilemap layers
    this.load.tilemap('caveGround', '../assets/images/caveInside/cave._ground.csv')
    this.load.tilemap('caveWalls', '../assets/images/caveInside/cave._walls.csv')
    this.load.tilemap('caveWater', '../assets/images/caveInside/cave._water.csv')

    this.load.image('chatbox', '../assets/images/chatbox.jpg')

    // music
    // let's add creepy music
    // this.load.audio('music', '../assets/sounds/bakery.m4a')
  }

  create () {
    this.overlap = false

    this.ground = this.game.add.tilemap('caveGround', 16, 16)
    this.ground.addTilesetImage('caveSet')
    this.caveGround = this.ground.createLayer(0)
    this.game.physics.arcade.enable(this.ground)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(-320, 0, 1344, 960)

    this.walls = this.game.add.tilemap('caveWalls', 16, 16)
    this.walls.addTilesetImage('caveSet')
    this.caveWalls = this.walls.createLayer(0)
    this.walls.setCollisionBetween(0, 2000, true, this.caveWalls)

    this.water = this.game.add.tilemap('caveWater', 16, 16)
    this.water.addTilesetImage('caveSet')
    this.caveWater = this.water.createLayer(0)
    this.game.physics.arcade.enable(this.water)
    this.water.setCollisionBetween(0, 2000, true, this.caveWater)

    this.boy = this.game.add.sprite(this.world.centerX + 50, this.world.centerY - 300, 'boy')
    this.boy.scale.setTo(0.7)
    // add cave character scale
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.game.physics.enable(this.boy, Phaser.Physics.ARCADE)
    // this.game.physics.enable(this.baker, Phaser.Physics.ARCADE)
    this.boy.body.collideWorldBounds = true
    this.camera.follow(this.boy)

    this.boy.animations.add('walkUp', [104, 105, 106, 107, 108, 109, 110, 111, 112], null, true)
    this.boy.animations.add('walkLeft', [117, 118, 119, 120, 121, 122, 123, 124, 125], null, true)
    this.boy.animations.add('walkDown', [130, 131, 132, 133, 134, 135, 136, 137, 138], null, true)
    this.boy.animations.add('walkRight', [143, 144, 145, 146, 147, 148, 149, 150, 151], null, true)

    // this.baker.animations.add('standing', [26, 27], null, true)
    // add ogre standing

    // music
    this.music = this.add.audio('Cave')
    this.music.play()

    // Add kitten
    this.kitten = this.game.add.sprite(this.world.centerX-300, this.world.centerY-200, 'kitten')
    this.kitten.animations.add('standing', [0,1,2,3], null, true)

    this.game.physics.enable(this.kitten, Phaser.Physics.ARCADE)
    this.kitten.body.immovable = true
  }

  update () {
    this.game.physics.arcade.collide(this.boy, this.caveWalls)
    this.game.physics.arcade.collide(this.boy, this.caveWater)

    this.kitten.animations.play('standing', 20, true)
    this.game.physics.arcade.overlap(this.boy, this.kitten, () => {
      if (!this.kittenOverlap) {
        makeChatbox([
          'Ahhh... Ahhhh...',
          'Why are you here?',
          'I thought no one would ever find me.',
          'Please don’t tell anyone that I am alive!',
          'Welcome to my rave cave! You can party with me!'
        ], 'Pythagoras', this)
        this.kittenOverlap = true
      }
    }, null, this)

    if (this.boy.x < 435 && this.boy.x > 390 && this.boy.y < 140.0 && this.boy.y > 90) {
      console.log('get out')
      this.game.state.start('Game')
      this.music.stop()
    }

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
