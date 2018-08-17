
import Phaser from 'phaser'
import makeChatbox from './helperFunctions/makeChatbox'
import store, {setCurrentAbilityId} from '../store'
import spriteUrl from './helperFunctions/spriteUrl'

export default class extends Phaser.State {
  preload () {
    store.dispatch(setCurrentAbilityId(4))

    // characters and creatures
    this.load.spritesheet('gnome', '../assets/images/creatures/gnome.png', 32, 32)
    this.load.spritesheet('livingTree', '../assets/images/creatures/livingTree.png', 32, 32)
    this.load.spritesheet('rose', '../assets/images/creatures/rose.png', 32, 32)
    this.load.spritesheet('snakeman', '../assets/images/creatures/snakeman.png', 32, 32)
    this.load.spritesheet('spider', '../assets/images/creatures/spider.png', 32, 32)

    this.load.spritesheet('boy', spriteUrl(), 64, 64)
    this.load.spritesheet('villain', '../assets/images/villain_idle.png', 80, 80)

    this.load.tilemap('ground', '../assets/images/forest_ground1.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('holes', '../assets/images/forest_holes2.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('trees', '../assets/images/forest_trees3.csv', null, Phaser.Tilemap.CSV)
    this.load.image('tileset', '../assets/images/ProjectUtumno_full.png')

    this.load.image('chatbox', '../assets/images/chatbox.jpg')

    // music
    this.load.audio('music', '../assets/sounds/foggywoods.mp3')
    this.load.audio('scream', '../assets/sounds/scream.m4a')
  }

  create () {
    // music
    this.music = this.add.audio('music')
    this.music.volume = 0.5
    this.music.play()

    this.scream = this.add.audio('scream')
    this.scream.volume = 0.5

    this.overlap = false
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(-320, 0, 1280, 960)

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

    // creatures
    this.snakeman = this.game.add.sprite(178, 912, 'snakeman')
    this.createMonsters(this.snakeman, 'vertical', -150)

    this.rose = this.game.add.sprite(627, 368, 'rose')
    this.createMonsters(this.rose, 'horizontal', 50)

    this.gnome = this.game.add.sprite(32, 485, 'gnome')
    this.createMonsters(this.gnome, 'horizontal', 50)

    this.spider = this.game.add.sprite(448, 131, 'spider')
    this.createMonsters(this.spider, 'horizontal', 50)

    this.livingTree = this.game.add.sprite(608, 701, 'livingTree')
    this.game.physics.enable(this.livingTree, Phaser.Physics.ARCADE)
    this.livingTree.body.collideWorldBounds = true
    this.livingTree.body.bounce.setTo(1, 1)
    this.livingTree.body.velocity.x = 50

    this.villain = this.game.add.sprite(90, 20, 'villain')
    this.villain.scale.setTo(1)
    this.game.physics.enable(this.villain, Phaser.Physics.ARCADE)
    this.villain.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], null, true)

    this.boy = this.game.add.sprite(this.world.centerX + 260, this.world.centerY, 'boy')
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

    this.game.physics.arcade.collide(this.rose, this.forestTrees)
    this.game.physics.arcade.overlap(this.boy, this.rose, () => this.restart(), null, this)

    this.game.physics.arcade.collide(this.snakeman, this.forestTrees)
    this.game.physics.arcade.overlap(this.boy, this.snakeman, () => this.restart(), null, this)

    this.game.physics.arcade.collide(this.livingTree, this.forestTrees)
    this.game.physics.arcade.overlap(this.boy, this.livingTree, () => this.restart(), null, this)

    this.game.physics.arcade.collide(this.spider, this.forestTrees)
    this.game.physics.arcade.overlap(this.boy, this.spider, () => this.restart(), null, this)

    this.game.physics.arcade.collide(this.gnome, this.forestTrees)
    this.game.physics.arcade.overlap(this.boy, this.gnome, () => this.restart(), null, this)

    this.villain.animations.play('idle', 20, true)
    this.game.physics.arcade.overlap(this.boy, this.villain, () => {
      if (!this.overlap) {
        makeChatbox([
          "Well I don’t know what the villian is supposed to say.",
          "Whatever.",
          "Here are some math problems for you to solve."
        ], 'Ghost', this, "House")
        this.overlap = true
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

  createMonsters (creature, direction, speed) {
    this.game.physics.enable(creature, Phaser.Physics.ARCADE)
    creature.body.collideWorldBounds = true
    creature.body.bounce.setTo(1, 1)
    if (direction === 'horizontal') {
      creature.body.velocity.x = speed
    } else {
      creature.body.velocity.y = speed
    }
  }

  restart () {
    this.scream.play()
    this.camera.fade(0xff0000, 1500)
    setTimeout(() => {
      this.music.restart()
      this.game.camera.resetFX()
      this.boy.x = this.world.centerX + 260
      this.boy.y = this.world.centerY }, 2000)
  }

  render () {
    this.game.debug.spriteInfo(this.boy, 20, 32)
  }
}
