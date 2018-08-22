import Phaser from 'phaser'
import store, {setCurrentAbilityId} from '../store'
import makeChatbox from './helperFunctions/makeChatbox'
export default class extends Phaser.State {
  preload () {
    store.dispatch(setCurrentAbilityId(3))
  }

  create () {
    this.overlap = false

    this.insidewall = this.game.add.tilemap('insidewall')
    this.insidewall.addTilesetImage('bakerySet')
    this.bakeryInsideWall = this.insidewall.createLayer(0)
    this.game.physics.arcade.enable(this.insidewall)
    this.insidewall.setCollisionBetween(0, 6080, true, this.bakeryInsideWall)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(-320, 0, 1344, 960)
    this.floor = this.game.add.tilemap('bakeryFloor')
    this.floor.addTilesetImage('bakerySet')
    this.bakeryFloor = this.floor.createLayer(0)

    this.furniture = this.game.add.tilemap('bakeryFurniture')
    this.furniture.addTilesetImage('bakerySet')
    this.bakeryFurniture = this.furniture.createLayer(0)
    this.game.physics.arcade.enable(this.furniture)
    this.furniture.setCollisionBetween(0, 2000, true, this.bakeryFurniture)

    this.outsideWall = this.game.add.tilemap('outsidewall')
    this.outsideWall.addTilesetImage('bakerySet')
    this.bakeryOutsideWall = this.outsideWall.createLayer(0)
    this.game.physics.arcade.enable(this.outsideWall)
    this.outsideWall.setCollisionBetween(0, 6080, this, this.bakeryOutsideWall)

    this.onFurniture = this.game.add.tilemap('onfurniture')
    this.onFurniture.addTilesetImage('bakerySet')
    this.bakeryOnFurniture = this.onFurniture.createLayer(0)
    this.game.physics.arcade.enable(this.onFurniture)
    this.onFurniture.setCollisionBetween(0, 6080, true, this.bakeryOnFurniture)

    this.boy = this.game.add.sprite(this.world.centerX - 50, this.world.centerY + 320, 'boy')
    this.baker = this.game.add.sprite(this.world.centerX - 150, this.world.centerY - 150, 'baker')
    this.boy.scale.setTo(1)
    this.baker.scale.setTo(1)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.game.physics.enable(this.boy, Phaser.Physics.ARCADE)
    this.game.physics.enable(this.baker, Phaser.Physics.ARCADE)
    this.boy.body.collideWorldBounds = true
    this.camera.follow(this.boy)

    this.boy.animations.add('walkUp', [104, 105, 106, 107, 108, 109, 110, 111, 112], null, true)
    this.boy.animations.add('walkLeft', [117, 118, 119, 120, 121, 122, 123, 124, 125], null, true)
    this.boy.animations.add('walkDown', [130, 131, 132, 133, 134, 135, 136, 137, 138], null, true)
    this.boy.animations.add('walkRight', [143, 144, 145, 146, 147, 148, 149, 150, 151], null, true)

    this.baker.animations.add('standing', [26, 27], null, true)

    // music
    this.music = this.add.audio('bakeryMusic')
    this.music.play()
  }

  update () {
    this.game.physics.arcade.collide(this.boy, this.bakeryFurniture)
    this.game.physics.arcade.collide(this.boy, this.bakeryOutsideWall)
    this.game.physics.arcade.overlap(this.boy, this.baker, () => {
      if (!this.overlap) {
        const name = store.getState().user.username
        makeChatbox([
          `Hello ${name}!`,
          "I want to start selling some ice cream!",
          "But I need to figure some numbers out...",
          "Could you help me?"
        ], 'Baker', this, "House")
        this.overlap = true
      }
    }, null, this)

    if (this.boy.x < 380 && this.boy.x > 350 && this.boy.y < 886.0 && this.boy.y > 870) {
      this.game.state.start('Game')
      this.music.stop()
    }

    this.baker.animations.play('standing', 5, true)

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
