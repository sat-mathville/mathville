/* globals __DEV__ */
import Phaser from 'phaser'
import lang from '../lang'
import store, {getProblems} from '../store'
import spriteUrl from './helperFunctions/spriteUrl'
import animate from './helperFunctions/animate'
import navigate from './helperFunctions/navigate'

export default class extends Phaser.State {
  preload () {
    this.load.spritesheet('boy', spriteUrl(),64,64)
    this.load.spritesheet('door', '../assets/images/door.png',105, 111)
    this.load.spritesheet('forestDoor', '../assets/images/forestDoor.png',105, 111)
    this.load.tilemap('map', '../assets/images/stations3_land_1.csv',null,Phaser.Tilemap.CSV)
    this.load.tilemap('grass', '../assets/images/stations3_grass_2.csv',null,Phaser.Tilemap.CSV)
    this.load.tilemap('stations', '../assets/images/stations3_stations_3.csv',null,Phaser.Tilemap.CSV)
    this.load.tilemap('details', '../assets/images/stations3_details_4.csv',null,Phaser.Tilemap.CSV)
    this.load.image('tileset','../assets/images/ProjectUtumno_full.png')
    this.load.image('scoreboard', '../assets/images/scoreboard.png')
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

    // Create layers
    this.land_1 = this.map.createLayer(0)
    this.grass_2 = this.grass.createLayer(0)
    this.stations_3 = this.stations.createLayer(0)
    this.details_4 = this.details.createLayer(0)

    // Set up physics (barriers) for walls and trees and stuff
    this.game.physics.arcade.enable(this.stations)
    this.stations.setCollisionBetween(0, 6080, true, this.stations_3)

    // Create entrances to other game scenes
    this.door = this.game.add.sprite(1265, 268, 'door')
    this.door.scale.setTo(0.5)
    this.game.physics.enable(this.door, Phaser.Physics.ARCADE)

    this.forestDoor = this.game.add.sprite(127, 319, 'forestDoor')
    this.forestDoor.scale.setTo(0.35)
    this.game.physics.enable(this.forestDoor, Phaser.Physics.ARCADE)

    // Create player's character
    // Make sure you set up the physics first before animating the character
    this.boy = this.game.add.sprite(1200, 350, 'boy')
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
      for (let i = 0; i < abilitiesIds.length; i++) {
        sum += store.getState().abilities.find(ability => ability.id === abilitiesIds[i]).value
      }
      return sum
    }
    this.scoreNum = this.add.text(this.scoreboard.x+10,this.scoreboard.y+20,`Score: ${calculateScore()}`)
    this.scoreNum.fixedToCamera = true
  }

  update () {
    this.game.physics.arcade.collide(this.boy, this.stations_3)
    this.game.physics.arcade.overlap(this.boy, this.door, () => {
      this.game.state.start('WizardHouse')
    }, null, this)
    this.game.physics.arcade.overlap(this.boy, this.forestDoor, () => {
      this.game.state.start('ForbiddenForest')
    }, null, this)

    navigate(this.cursors, this.boy)
  }
}
