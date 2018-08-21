/* globals __DEV__ */
import Phaser from 'phaser'
import store, {auth, setCoord, addNewAbilityThunk} from '../store'
import spriteUrl from './helperFunctions/spriteUrl'
import animate from './helperFunctions/animate'
import navigate from './helperFunctions/navigate'
import makeChatbox from './helperFunctions/makeChatbox'
import instructionsChat from './helperFunctions/instructionsChat'
import {images, characters, spritesheets, tilemaps} from './preloadData'
import { barriers } from './createData'

export default class extends Phaser.State {
  preload () {
    // images
    for (let image in images) {
      this.load.image(image, images[image])
    }

    // character spritesheets
    this.load.spritesheet('boy', spriteUrl(), 64, 64)
    for (let character in characters) {
      this.load.spritesheet(character, characters[character], 64, 64)
    }

    for (let spritesheet in spritesheets) {
      this.load.spritesheet(spritesheet, spritesheets[spritesheet])
    }

    // tilemaps
    for (let tilemap in tilemaps) {
      this.load.tilemap(tilemap, tilemaps[tilemap]['imageUrl'], null, Phaser.Tilemap.CSV)
    }

    // music
    this.load.audio('music', '../assets/sounds/mapBGM.mp3')
  }

  create () {
    // Load main map/world
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 1920, 1024)

    // the loop below used preload data and not create data
    for (let tileset in tilemaps) {
      // add tilemap
      this[tileset] = this.game.add.tilemap(tileset)
      // add tile image
      this[tileset].addTilesetImage(tilemaps[tileset]['tilesetImage'])
      // create tile layer
      this[tilemaps[tileset]['createLayerName']] = this[tileset].createLayer(0)
    }

    // Create BGM
    this.music = this.add.audio('music')
    this.music.play()

    for (let barrier in barriers) {
      this[barrier] = this.game.add.sprite(barriers[barrier]['x'], barriers[barrier]['y'], barrier)
      this[barrier].scale.setTo(barriers[barrier]['scale'])
      this.game.physics.enable(this[barrier], Phaser.Physics.ARCADE)
    }

    this.house4 = this.game.add.sprite(543, 455, 'house3')
    this.game.physics.enable(this.house4, Phaser.Physics.ARCADE)

    // reducing the collision size around wizard house to let character get closer to the door
    this.wizardhouse.body.width = 140
    this.wizardhouse.body.height = 250

    // Set up physics (barriers) for walls and trees and stuff
    this.game.physics.arcade.enable(this.stations)
    this.stations.setCollisionBetween(0, 6080, true, this.stations_3)
    this.game.physics.arcade.enable(this.flowers)
    this.flowers.setCollisionBetween(0, 6080, true, this.flowers_5)
    this.game.physics.arcade.enable(this.trees)
    this.trees.setCollisionBetween(0, 6080, true, this.trees_6)

    // other characters
    this.farmer.animations.add('standing', [120, 121, 122, 123, 124, 125, 126, 127], null, true)

    this.warrior.animations.add('standing', [39, 40, 41, 42], null, true)
    this.warrior.body.immovable = true

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

    // Import scoreboard and calculate score
    this.scoreboard = this.game.add.sprite(0, 0, 'scoreboard')
    this.scoreboard.fixedToCamera = true
    this.scoreboard.scale.setTo(1)
    this.bag = this.game.add.sprite(173, 5, 'bag')
    this.bag.fixedToCamera = true
    this.bag.scale.setTo(1.11)

    function calculateScore () {
      const abilitiesIds = store.getState().userAbilities
      let sum = 0
      for (let entry of abilitiesIds) {
        sum += store.getState().abilities.find(ability => ability.id === entry).value
      }
      return sum
    }

    this.scoreNum = this.add.text(
      this.scoreboard.x + 10,
      this.scoreboard.y + 25,
      `Score: ${calculateScore()}`,
      {font: '25px Cinzel', fill: '#000', align: 'left'})

    this.scoreNum.fixedToCamera = true

    // Logout Button
    this.logoutBtn = this.game.add.button(0, 80, 'logoutBtn', this.actionOnLogout, this)
    this.logoutBtn.fixedToCamera = true
    this.logoutBtn.width = 100
    this.logoutBtn.height = 30
    this.txt = this.add.text(this.logoutBtn.x + 25, this.logoutBtn.y, 'Exit', {font: '25px Cinzel', fill: '#fff', align: 'center'})
    this.txt.fixedToCamera = true

    let dialogue = ['Hey!', 'I have extra fish.', 'Let me give you some.', 'They are good for your strength.']

    this.instructionsBtn = this.game.add.button(98,80, 'instructionsBtn', () => instructionsChat(dialogue, this), this)
    this.instructionsBtn.fixedToCamera = true
    this.instructionsBtn.width = 224
    this.instructionsBtn.height = 29
    this.txt = this.add.text(this.instructionsBtn.x + 20, this.instructionsBtn.y, 'Instructions', {font: '25px Cinzel', fill: '#fff', align: 'center'})
    this.txt.fixedToCamera = true



    // pull in supplies
    function fetchSupplies() {
      const abilitiesIds = store.getState().userAbilities
      // console.log('ability ids', abilitiesIds)
      let images = []
      for(let entry of abilitiesIds) {
        images.push(store.getState().abilities.find(ability => ability.id === entry).image)
      }
      return images
    }

    let x
    let y

    for(let i = 1; i <= store.getState().userAbilities.size; i++){
      x = (i * 35) + 140
      let xcount = 0

      if(i>4){
        y=45
        x=(xcount*35) + 174
        xcount++
      } else {
        y=9
      }

      this.abilityImages = this.add.image(x, y, fetchSupplies()[i-1])
      this.abilityImages.fixedToCamera = true
    }

      this.abilityImages = this.add.image(x, y, fetchSupplies()[i - 1])
      this.abilityImages.fixedToCamera = true
    
  }

  update () {
    // this.keys(()=>{console.log(`TEST KEYS`)})
    this.game.physics.arcade.collide(this.boy, this.stations_3)
    this.game.physics.arcade.collide(this.boy, this.flowers_5)
    this.game.physics.arcade.collide(this.boy, this.trees_6)
    this.game.physics.arcade.collide(this.boy, this.bakery)
    this.game.physics.arcade.collide(this.boy, this.house1)
    this.game.physics.arcade.collide(this.boy, this.house2)
    this.game.physics.arcade.collide(this.boy, this.house3)
    this.game.physics.arcade.collide(this.boy, this.house4)
    this.game.physics.arcade.collide(this.boy, this.wizardhouse)
    this.game.physics.arcade.collide(this.boy, this.sign1)
    this.game.physics.arcade.collide(this.boy, this.sign2)
    this.game.physics.arcade.collide(this.boy, this.sign3)
    this.bakery.body.immovable = true
    this.house1.body.immovable = true
    this.house2.body.immovable = true
    this.house3.body.immovable = true
    this.house4.body.immovable = true
    this.wizardhouse.body.immovable = true
    this.sign1.body.immovable = true
    this.sign2.body.immovable = true
    this.sign3.body.immovable = true

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
    this.game.physics.arcade.overlap(this.boy, this.bakeryDoor, () => {
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
        makeChatbox([
          'Hi there!',
          'I have too many crops.',
          'Let me give you some strawberries.',
          'They are good for your health.'
        ], 'Farmer', this)
        this.farmerOverlap = true
        store.dispatch(addNewAbilityThunk(2))
        // store.subscribe(addNewAbilityThunk.bind(null,2))
      }
    }, null, this)

    // talk to warrior
    this.warrior.animations.play('standing', 2, true)
    this.game.physics.arcade.overlap(this.boy, this.warrior, () => {
      if (!this.warriorOverlap) {
        makeChatbox(['Hi!', 'The forbidden forest is very dangerous.', 'Be prepared!', 'Here is a sword.'], 'Warrior', this)
        this.warriorOverlap = true
        store.dispatch(addNewAbilityThunk(7))
        // store.subscribe(addNewAbilityThunk.bind(null,7))
      }
    }, null, this)

    this.fisherman.animations.play('standing', 1, true)
    this.game.physics.arcade.overlap(this.boy, this.fisherman, () => {
      if (!this.fishermanOverlap) {
        makeChatbox(['Hey!', 'I have extra fish.', 'Let me give you some.', 'They are good for your strength.'], 'Fisherman', this)
        this.fishermanOverlap = true
        store.dispatch(addNewAbilityThunk(6))
        // store.subscribe(addNewAbilityThunk.bind(null,6))
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
  }
}
