/* globals __DEV__ */
import Phaser from 'phaser'
import store, {auth, setCoord} from '../store'
import spriteUrl from './helperFunctions/spriteUrl'
import animate from './helperFunctions/animate'
import navigate from './helperFunctions/navigate'
import makeChatbox from './helperFunctions/makeChatbox'

export default class extends Phaser.State {
  preload () {
    // characters
    this.load.spritesheet('boy', spriteUrl(), 64, 64)
    this.load.spritesheet('farmer', '../assets/images/characters/farmer.png', 64, 64)
    this.load.spritesheet('warrior', '../assets/images/characters/warrior.png', 64, 64)
    this.load.spritesheet('fisherman', '../assets/images/characters/fisherman.png', 64, 64)

    // objects
    this.load.spritesheet('door', '../assets/images/door.png', 105, 111)
    this.load.spritesheet('forestDoor', '../assets/images/forestDoor.png', 105, 111)
    this.load.image('bakerydoor', '../assets/images/bakersOutside/bakerydoor.png')
    this.load.spritesheet('bakery', '../assets/images/bakersOutside/smallerHouse.png')

    // tilemaps
    this.load.tilemap('map', '../assets/images/stations3_land_1.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('grass', '../assets/images/stations3_grass_2.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('stations', '../assets/images/stations3_stations_3.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('details', '../assets/images/stations3_details_4.csv', null, Phaser.Tilemap.CSV)
    this.load.image('tileset', '../assets/images/ProjectUtumno_full.png')
    this.load.image('scoreboard', '../assets/images/scoreboard.png')

    //ability sprites
    this.load.image('')

    // music
    this.load.audio('music', '../assets/sounds/mapBGM.mp3')

    // chatbox
    this.load.image('chatbox', '../assets/images/chatbox.jpg')

    // logout button
    this.load.image('logoutBtn', '../assets/images/exit.png')
  }

  create () {
    // Load main map/world
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 1920, 1080)
    this.map = this.game.add.tilemap('map')
    this.grass = this.game.add.tilemap('grass')
    this.stations = this.game.add.tilemap('stations')
    this.details = this.game.add.tilemap('details')
    this.map.addTilesetImage('tileset')
    this.grass.addTilesetImage('tileset')
    this.stations.addTilesetImage('tileset')
    this.details.addTilesetImage('tileset')

    // Create BGM
    this.music = this.add.audio('music')
    this.music.play()

    // Create layers
    this.land_1 = this.map.createLayer(0)
    this.grass_2 = this.grass.createLayer(0)
    this.stations_3 = this.stations.createLayer(0)
    this.details_4 = this.details.createLayer(0)

    // set up barriers for the bakery
    this.bakery = this.game.add.sprite(680, 180, 'bakery')
    this.bakery.scale.setTo(0.5)
    this.game.physics.enable(this.bakery, Phaser.Physics.ARCADE)
    this.bakery.immovable = true

    // Set up physics (barriers) for walls and trees and stuff
    this.game.physics.arcade.enable(this.stations)
    this.stations.setCollisionBetween(0, 6080, true, this.stations_3)

    // Create entrances to other game scenes
    this.door = this.game.add.sprite(1265, 268, 'door')
    this.door.scale.setTo(0.5)
    this.game.physics.enable(this.door, Phaser.Physics.ARCADE)

    this.bakerydoor = this.game.add.sprite(744, 294, 'bakerydoor')
    this.bakerydoor.scale.setTo(1)
    this.game.physics.enable(this.bakerydoor, Phaser.Physics.ARCADE)

    this.forestDoor = this.game.add.sprite(127, 319, 'forestDoor')
    this.forestDoor.scale.setTo(0.35)
    this.game.physics.enable(this.forestDoor, Phaser.Physics.ARCADE)

    // other characters
    this.farmer = this.game.add.sprite(728, 750, 'farmer')
    this.farmer.scale.setTo(0.85)
    this.game.physics.enable(this.farmer, Phaser.Physics.ARCADE)
    this.farmer.animations.add('standing', [120, 121, 122, 123, 124, 125, 126, 127], null, true)

    this.warrior = this.game.add.sprite(127, 900, 'warrior')
    this.warrior.scale.setTo(0.85)
    this.game.physics.enable(this.warrior, Phaser.Physics.ARCADE)
    this.warrior.animations.add('standing', [39, 40, 41, 42], null, true)
    this.warrior.body.immovable = true

    this.fisherman = this.game.add.sprite(1400, 760, 'fisherman')
    this.fisherman.scale.setTo(0.85)
    this.game.physics.enable(this.fisherman, Phaser.Physics.ARCADE)
    this.fisherman.animations.add('standing', [26, 27], null, true)

    // Create player's character
    // Make sure you set up the physics first before animating the character
    this.boy = this.game.add.sprite(
      store.getState().coord[0],
      store.getState().coord[1],
      'boy'
    )
    this.game.physics.arcade.enable(this.boy)
    this.camera.follow(this.boy) // Set up the camera to follow the character
    animate(this.boy)

    // Create keyboard input tracker
    this.cursors = this.game.input.keyboard.createCursorKeys()

    // Import scorebard and calculate score
    this.scoreboard = this.game.add.sprite(0, 0, 'scoreboard')
    this.scoreboard.fixedToCamera = true
    function calculateScore () {
      const abilitiesIds = store.getState().userAbilities
      let sum = 0
      for (let entry of abilitiesIds) {
        sum += store.getState().abilities.find(ability => ability.id === entry).value
      }
      return sum
    }
    this.scoreNum = this.add.text(this.scoreboard.x + 10, this.scoreboard.y + 20, `Score: ${calculateScore()}`)
    this.scoreNum.fixedToCamera = true

    // Logout Button
    this.logoutBtn = this.game.add.button(0, 80, 'logoutBtn', this.actionOnLogout, this)
    this.logoutBtn.fixedToCamera = true
    this.logoutBtn.width = 100
    this.logoutBtn.height = 30
    this.txt = this.add.text(this.logoutBtn.x + 25, this.logoutBtn.y, 'Exit', {font: '25px Times', fill: '#fff', align: 'center'})
    this.txt.fixedToCamera = true
  }

  update () {
    this.game.physics.arcade.collide(this.boy, this.stations_3)
    this.game.physics.arcade.collide(this.boy, this.bakery)
    this.bakery.body.immovable = true

    this.game.physics.arcade.overlap(this.boy, this.door, () => {
      store.dispatch(setCoord([
        this.boy.x, this.boy.y + 20
      ]))
      this.music.stop()
      this.game.state.start('WizardHouse')
    }, null, this)
    this.game.physics.arcade.overlap(this.boy, this.forestDoor, () => {
      store.dispatch(setCoord([
        this.boy.x, this.boy.y + 20
      ]))
      this.music.stop()
      this.game.state.start('ForbiddenForest')
    }, null, this)
    this.game.physics.arcade.overlap(this.boy, this.bakerydoor, () => {
      store.dispatch(setCoord([
        this.boy.x, this.boy.y + 20
      ]))
      this.music.stop()
      this.game.state.start('BakerShopInside')
    })

    // talk to farmer
    this.farmer.animations.play('standing', 2, true)
    this.game.physics.arcade.overlap(this.boy, this.farmer, () => {
      if (!this.farmerOverlap) {
        makeChatbox(['Hi there!', 'I have too many crops', 'Let me give you some strawberries', 'they are good for your health'], 'farmer', this)
        this.farmerOverlap = true
      }
    }, null, this)

    // talk to warrior
    this.warrior.animations.play('standing', 2, true)
    this.game.physics.arcade.overlap(this.boy, this.warrior, () => {
      if (!this.warriorOverlap) {
        makeChatbox(['Hi!', 'The forbidden forest is very dangerous', 'Be prepared!', 'Here is a sword'], 'Warrior', this)
        this.warriorOverlap = true
      }
    }, null, this)

    this.fisherman.animations.play('standing', 1, true)
    this.game.physics.arcade.overlap(this.boy, this.fisherman, () => {
      if (!this.fishermanOverlap) {
        makeChatbox(['Hey!', 'I have extra fish', 'Let me give you some', 'they are good for your strength'], 'Fisherman', this)
        this.fishermanOverlap = true
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

    navigate(this.cursors, this.boy)
  }
  actionOnLogout () {
    store.dispatch(auth({}, 'logout'))
    const canvas = document.getElementsByTagName('canvas')[0]
    canvas.remove()

    this.game.destroy()
  }


}
