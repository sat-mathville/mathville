import makeChatbox from './helperFunctions/makeChatbox'
import Phaser from 'phaser'
import store, {setCurrentAbilityId} from '../store'

export default class extends Phaser.State {
  preload () {
    store.dispatch(setCurrentAbilityId(1))
  }

  create () {
    this.overlap = false

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(-320, 0, 1344, 640)
    this.house = this.game.add.tilemap('house')
    this.house.addTilesetImage('tileset')
    this.wizardHouse = this.house.createLayer(0)

    this.desk = this.game.add.tilemap('desk')
    this.desk.addTilesetImage('tileset')
    this.wizardDesk = this.desk.createLayer(0)

    this.wall = this.game.add.tilemap('wall')
    this.wall.addTilesetImage('tileset')
    this.wizardWall = this.wall.createLayer(0)
    this.game.physics.arcade.enable(this.wall)
    this.wall.setCollisionBetween(0, 6080, true, this.wizardWall)

    this.furniture = this.game.add.tilemap('furniture')
    this.furniture.addTilesetImage('elfhouse')
    this.wizardFurniture = this.furniture.createLayer(0)
    this.game.physics.arcade.enable(this.furniture)
    this.furniture.setCollisionBetween(0, 6080, true, this.wizardFurniture)
    this.potions = this.game.add.sprite(0, 0, 'potions')

    this.purpleFire1 = this.game.add.sprite(100, 105, 'purpleFire')
    this.purpleFire1.animations.add('move', [0, 3, 2, 1, 7, 4, 5, 6], null, true)
    this.purpleFire1.scale.setTo(1.2)

    this.purpleFire2 = this.game.add.sprite(164, 105, 'purpleFire')
    this.purpleFire2.animations.add('move', [0, 3, 2, 1, 7, 4, 5, 6], null, true)
    this.purpleFire2.scale.setTo(1.2)

    this.purpleFire3 = this.game.add.sprite(228, 105, 'purpleFire')
    this.purpleFire3.animations.add('move', [0, 3, 2, 1, 7, 4, 5, 6], null, true)
    this.purpleFire3.scale.setTo(1.2)

    this.purpleFire4 = this.game.add.sprite(292, 105, 'purpleFire')
    this.purpleFire4.animations.add('move', [0, 3, 2, 1, 7, 4, 5, 6], null, true)
    this.purpleFire4.scale.setTo(1.2)

    this.starFire1 = this.game.add.sprite(600, 100, 'starFire')
    this.starFire1.animations.add('move', [0, 3, 2, 1, 7, 4, 5, 6], null, true)

    this.starFire2 = this.game.add.sprite(664, 100, 'starFire')
    this.starFire2.animations.add('move', [0, 3, 2, 1, 7, 4, 5, 6], null, true)

    this.starFire3 = this.game.add.sprite(728, 100, 'starFire')
    this.starFire3.animations.add('move', [0, 3, 2, 1, 7, 4, 5, 6], null, true)

    this.starFire4 = this.game.add.sprite(792, 100, 'starFire')
    this.starFire4.animations.add('move', [0, 3, 2, 1, 7, 4, 5, 6], null, true)

    //music
    this.music = this.add.audio('wizardMusic')
    this.music.play()

    this.boy = this.game.add.sprite(this.world.centerX + 200, this.world.centerY + 150, 'boy')
    this.wizard = this.game.add.sprite(this.world.centerX - 50, this.world.centerY + 150, 'wizard')
    this.boy.scale.setTo(1)
    this.wizard.scale.setTo(0.35)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.game.physics.enable(this.boy, Phaser.Physics.ARCADE)
    this.game.physics.enable(this.wizard, Phaser.Physics.ARCADE)
    this.boy.body.collideWorldBounds = true
    this.camera.follow(this.boy)

    this.boy.animations.add('walkUp', [104, 105, 106, 107, 108, 109, 110, 111, 112], null, true)
    this.boy.animations.add('walkLeft', [117, 118, 119, 120, 121, 122, 123, 124, 125], null, true)
    this.boy.animations.add('walkDown', [130, 131, 132, 133, 134, 135, 136, 137, 138], null, true)
    this.boy.animations.add('walkRight', [143, 144, 145, 146, 147, 148, 149, 150, 151], null, true)

    this.wizard.animations.add('eyes', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], null, true)
  }

  update () {
    this.game.physics.arcade.collide(this.boy, this.wizardWall)
    this.game.physics.arcade.collide(this.boy, this.wizardFurniture)
    this.game.physics.arcade.overlap(this.boy, this.wizard, () => {
      if (!this.overlap) {
        const name = store.getState().user.username
        makeChatbox([
          `Hey ${name}!`,
          "I have some math problems that I can’t solve...",
          "I need to figure them out before I can mix some potions...",
          "Could you give me some help?"
        ], 'Wizard', this, "House")
        this.overlap = true
      }
    }, null, this)

    if (this.boy.x < 675 && this.boy.x > 640 && this.boy.y < 580 && this.boy.y > 540) {
      this.music.stop()
      this.game.state.start('Game')
    }

    this.purpleFire1.animations.play('move', 10, true)
    this.purpleFire2.animations.play('move', 10, true)
    this.purpleFire3.animations.play('move', 10, true)
    this.purpleFire4.animations.play('move', 10, true)

    this.starFire1.animations.play('move', 10, true)
    this.starFire2.animations.play('move', 10, true)
    this.starFire3.animations.play('move', 10, true)
    this.starFire4.animations.play('move', 10, true)
    this.wizard.animations.play('eyes', 40, true)
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
