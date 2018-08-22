/* globals __DEV__ */
import Phaser from 'phaser'
import store, {
    auth,
    setCoord
  } from '../store'
import animate from './helperFunctions/animate'
import navigate from './helperFunctions/navigate'
import makeChatbox from './helperFunctions/makeChatbox'
import instructionsChat from './helperFunctions/instructionsChat'
import renderAbilities from './helperFunctions/renderAbilities'
import {tilemaps} from './preloadData'
import { barriers } from './createData'
import chickenMovement from './helperFunctions/chickenMovement'
import orcMovement from './helperFunctions/orcMovement'

export default class extends Phaser.State {
  preload () {
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
    this.farmer.body.immovable = true

    this.warrior.animations.add('standing', [39, 40, 41, 42], null, true)
    this.warrior.body.immovable = true

    this.fisherman.animations.add('standing', [26, 27], null, true)
    this.fisherman.body.immovable = true

    this.chicken.animations.add('walkUp',[0,1,2],null,true)
    this.chicken.animations.add('walkRight',[3,4,5],null,true)
    this.chicken.animations.add('walkDown',[6,7,8],null,true)
    this.chicken.animations.add('walkLeft',[9,10,11],null,true)
    this.game.physics.arcade.enable(this.chicken)

    this.orc.animations.add('walkLeft',[130,131,132,133,134,135,136,137,138],null,true)
    this.orc.animations.add('walkRight',[156,157,158,159,160,161,162,163,164],null,true)
    this.game.physics.arcade.enable(this.orc)

    // chicken movement
    chickenMovement(this.chicken)

    // Orc Movement
    orcMovement(this.orc)

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

  let dialogue = [`
  Welcome to Mathville!
  Mathville is a peaceful town where we have
  lived in harmony with each other for many
  years. However, lately we have had some
  unfortunate events...`,`
  Last month our dear villager, Pythagoras,
  went missing. Our local fisherman, Lambda,
  saw him captured by the creature from the
  cave and was quickly taken away.`,
  `
  I must warn you that for the few
  who have traveled to the cave, they have
  never come back! But you look like a brave
  soul who can tackle this challenge.
  Before you venture to the cave though,
  you must be prepared!`,`
  The BAKERY will give you health,
  our local WIZARD will give you magic,
  and in the FORBIDDEN FOREST you can
  find weapons. You will need these supplies
  to venture to the cave.`,
  `
  To explore this world you must use
  ARROW KEYS to move left, right, up,
  and down. When talking to someone use
  the SPACEBAR to keep the conversation
  going. If you answer all of the problems
  the villagers need help solving, you will
  receive a gift that will aid your journey
  to the cave. Good luck my friend!
  `
  ]

    this.instructionsBtn = this.game.add.button(98,80, 'instructionsBtn', () => instructionsChat(dialogue, this), this)
    this.instructionsBtn.fixedToCamera = true
    this.instructionsBtn.width = 224
    this.instructionsBtn.height = 29
    this.txt = this.add.text(this.instructionsBtn.x + 20, this.instructionsBtn.y, 'Instructions', {font: '25px Cinzel', fill: '#fff', align: 'center'})
    this.txt.fixedToCamera = true

    // pull in supplies
    renderAbilities(this)
  }

  update () {
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
          'Do you want some strawberries?',
          'I have too many.',
          'By the way, are you going to the cave?',
          'Have you gotten the golden egg?',
          'You can’t get in without it.',
        ], 'Farmer', this)
        this.farmerOverlap = true
      }
    }, null, this)

    // talk to warrior
    this.warrior.animations.play('standing', 2, true)
    this.game.physics.arcade.overlap(this.boy, this.warrior, () => {
      if (!this.warriorOverlap) {
        makeChatbox([
          'Are you going to the cave?',
          'I’ve been to the cave once...',
          'And it was awful.',
          'Be prepared!',
          'You will need this shield.'
        ], 'Warrior', this)
        this.warriorOverlap = true
      }
    }, null, this)

    this.fisherman.animations.play('standing', 1, true)
    this.game.physics.arcade.overlap(this.boy, this.fisherman, () => {
      if (!this.fishermanOverlap) {
        makeChatbox([
        'Do you want some fish?',
        'I can’t eat all the fish I just caught.',
        'Oh, you’re going to the cave!',
        'Have you heard that there is a dragon kidnaping people around here?',
        'Good luck...',
        'The other day I heard Pythagoras screaming in the cave.',
        'The dragon must have eaten him alive!',
      ], 'Fisherman', this)
        this.fishermanOverlap = true
      }
    }, null, this)

    this.game.physics.arcade.overlap(this.boy, this.chicken, () => {
      if (!this.chickenOverlap) {
        makeChatbox([
          'Puk Puk Pukaaak',
          'Bok',
          'EEggg'
        ], 'Chicken', this)
        this.chickenOverlap = true
      }
    }, null, this)

    // main character movement
    navigate(this.cursors, this.boy)

  }
  actionOnLogout () {
    store.dispatch(auth({}, 'logout'))
  }
}
