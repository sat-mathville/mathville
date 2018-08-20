/* globals __DEV__ */
import Phaser from 'phaser'
import store, {auth, setCoord, addNewAbilityThunk} from '../store'
import spriteUrl from './helperFunctions/spriteUrl'
import animate from './helperFunctions/animate'
import navigate from './helperFunctions/navigate'
import makeChatbox from './helperFunctions/makeChatbox'
import {images, characters, spritesheets, tilemaps} from './preloadData'

export default class extends Phaser.State {
  preload () {

    //images
    for(let image in images){
      this.load.image(image,images[image])
    }

    //character spritesheets
    this.load.spritesheet('boy', spriteUrl(),64,64)
    for(let character in characters){
      this.load.spritesheet(character, characters[character], 64, 64)
      console.log('where is the boooyyyy', characters[character])
    }

    for(let spritesheet in spritesheets){
      this.load.spritesheet(spritesheet, spritesheets[spritesheet])
    }

    //tilemaps
    for(let tilemap in tilemaps){
      this.load.tilemap(tilemap, tilemaps[tilemap], null, Phaser.Tilemap.CSV)
    }

    // music
    this.load.audio('music', '../assets/sounds/mapBGM.mp3')
  }

  create () {
    // Load main map/world
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 1920, 1024)
    this.map = this.game.add.tilemap('map')
    this.grass = this.game.add.tilemap('grass')
    this.bridge = this.game.add.tilemap('bridge')
    this.stations = this.game.add.tilemap('stations')
    this.details = this.game.add.tilemap('details')
    this.flowers = this.game.add.tilemap('flowers')
    this.trees = this.game.add.tilemap('trees')
    this.map.addTilesetImage('tileset')
    this.grass.addTilesetImage('tileset')
    this.stations.addTilesetImage('tileset')
    this.details.addTilesetImage('tileset')
    this.bridge.addTilesetImage('towntrees')
    this.flowers.addTilesetImage('towntrees')
    this.trees.addTilesetImage('towntrees')

    // Create BGM
    this.music = this.add.audio('music')
    this.music.play()

    // Create layers
    this.land_1 = this.map.createLayer(0)
    this.grass_2 = this.grass.createLayer(0)
    this.bridge_7 = this.bridge.createLayer(0)
    this.stations_3 = this.stations.createLayer(0)
    this.details_4 = this.details.createLayer(0)
    this.flowers_5 = this.flowers.createLayer(0)
    this.trees_6 = this.trees.createLayer(0)

    // set up barriers for the bakery
    this.bakery = this.game.add.sprite(710, 170, 'bakery')
    this.game.physics.enable(this.bakery, Phaser.Physics.ARCADE)

    //set up physics (barriers) for houses in town
    this.house1 = this.game.add.sprite(800,430, 'house1')
    this.game.physics.enable(this.house1, Phaser.Physics.ARCADE)
    this.game.physics.arcade.enable(this.house1)

    this.house2 = this.game.add.sprite(660,391, 'house2')
    this.game.physics.enable(this.house2, Phaser.Physics.ARCADE)
    this.game.physics.arcade.enable(this.house2)

    this.house3 = this.game.add.sprite(993,455, 'house3')
    this.game.physics.enable(this.house3, Phaser.Physics.ARCADE)
    this.game.physics.arcade.enable(this.house3)

    this.house4 = this.game.add.sprite(543,455, 'house3')
    this.game.physics.enable(this.house4, Phaser.Physics.ARCADE)
    this.game.physics.arcade.enable(this.house4)

    this.wizardhouse = this.game.add.sprite(890,10, 'wizardhouse')
    this.wizardhouse.scale.setTo(0.35)
    this.game.physics.enable(this.wizardhouse, Phaser.Physics.ARCADE)
    this.game.physics.arcade.enable(this.wizardhouse)

    this.signpost1 = this.game.add.sprite(650, 258, 'sign1')
    this.signpost1.scale.setTo(1)
    this.game.physics.enable(this.signpost1, Phaser.Physics.ARCADE)
    this.game.physics.arcade.enable(this.signpost1)

    this.signpost2 = this.game.add.sprite(1030, 244, 'sign2')
    this.signpost2.scale.setTo(0.9)
    this.game.physics.enable(this.signpost2, Phaser.Physics.ARCADE)
    this.game.physics.arcade.enable(this.signpost2)

    this.signpost3 = this.game.add.sprite(350, 326, 'sign3')
    this.signpost3.scale.setTo(1)
    this.game.physics.enable(this.signpost3, Phaser.Physics.ARCADE)
    this.game.physics.arcade.enable(this.signpost3)

    //reducing the collision size around wizard house to let character get closer to the door
    this.wizardhouse.body.width = 140;    
    this.wizardhouse.body.height = 250;

    // Set up physics (barriers) for walls and trees and stuff
    this.game.physics.arcade.enable(this.stations)
    this.stations.setCollisionBetween(0, 6080, true, this.stations_3)
    this.game.physics.arcade.enable(this.flowers)
    this.flowers.setCollisionBetween(0, 6080, true, this.flowers_5)
    this.game.physics.arcade.enable(this.trees)
    this.trees.setCollisionBetween(0, 6080, true, this.trees_6)

    // Create entrances to other game scenes
    this.door = this.game.add.sprite(952, 255, 'door')
    this.door.scale.setTo(0.3)
    this.game.physics.enable(this.door, Phaser.Physics.ARCADE)

    this.bakerydoor = this.game.add.sprite(744, 277, 'bakerydoor')
    this.bakerydoor.scale.setTo(1.1)
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

    // Import scoreboard and calculate score
    this.scoreboard = this.game.add.sprite(0, 0, 'scoreboard')
    this.scoreboard.fixedToCamera = true
    this.scoreboard.scale.setTo(1)
    this.bag = this.game.add.sprite(173,5, 'bag')
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
    this.game.physics.arcade.collide(this.boy, this.signpost1)
    this.game.physics.arcade.collide(this.boy, this.signpost2)
    this.game.physics.arcade.collide(this.boy, this.signpost3)
    this.bakery.body.immovable = true
    this.house1.body.immovable = true
    this.house2.body.immovable = true
    this.house3.body.immovable = true
    this.house4.body.immovable = true
    this.wizardhouse.body.immovable = true
    this.signpost1.body.immovable = true
    this.signpost2.body.immovable = true
    this.signpost3.body.immovable = true

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

    store.subscribe(()=> {
      
    })


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
    this.game.destroy()
    delete window.game
  }

}
