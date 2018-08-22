import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import {images, characters, spritesheets, tilemaps} from './preloadData'
import spriteUrl from './helperFunctions/spriteUrl'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])
    this.load.setPreloadSprite(this.loaderBar)

    // Main Map Assets
    for (let image in images) {
      this.load.image(image, images[image])
    }

    // character spritesheets
    this.load.spritesheet('boy', spriteUrl(), 64, 64)
    for (let character in characters) {
      this.load.spritesheet(character, characters[character], 64, 64)
    }

    // this.load.spritesheet('cave', '../assets/images/caveOutside/outsideCave.png', 16, 16)

    for (let spritesheet in spritesheets) {
      this.load.spritesheet(spritesheet, spritesheets[spritesheet])
    }

    // tilemaps
    for (let tilemap in tilemaps) {
      this.load.tilemap(tilemap, tilemaps[tilemap]['imageUrl'], null, Phaser.Tilemap.CSV)
    }

    // music
    this.load.audio('music', '../assets/sounds/mapBGM.mp3')

    // Wizard Assets
    this.load.spritesheet('purpleFire', '../assets/images/purpleFire.png', 23.8, 48)
    this.load.spritesheet('starFire', '../assets/images/starFire.png', 31.8, 63)
    this.load.spritesheet('wizard', '../assets/images/wizard_idle.png', 163, 185)
    this.load.tilemap('house', '../assets/images/WizardHouse_background1.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('desk', '../assets/images/WizardHouse_desk.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('wall', '../assets/images/WizardHouse_wall2.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('furniture', '../assets/images/WizardHouse_furniture3.csv', null, Phaser.Tilemap.CSV)
    this.load.image('elfhouse', '../assets/images/elfhouse.png')
    this.load.spritesheet('potions', '../assets/images/potions.png')
    this.load.image('chatbox', '../assets/images/chatbox.jpg')

    // music
    this.load.audio('wizardMusic', '../assets/sounds/wizardshop.m4a')

    // Forest Assets
    this.load.spritesheet('gnome', '../assets/images/creatures/gnome.png', 32, 32)
    this.load.spritesheet('livingTree', '../assets/images/creatures/livingTree.png', 32, 32)
    this.load.spritesheet('rose', '../assets/images/creatures/rose.png', 32, 32)
    this.load.spritesheet('snakeman', '../assets/images/creatures/snakeman.png', 32, 32)
    this.load.spritesheet('spider', '../assets/images/creatures/spider.png', 32, 32)

    this.load.spritesheet('villain', '../assets/images/villain_idle.png', 80, 80)

    this.load.tilemap('forestGround', '../assets/images/forest_ground1.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('holes', '../assets/images/forest_holes2.csv', null, Phaser.Tilemap.CSV)
    this.load.tilemap('forestTrees', '../assets/images/forest_trees3.csv', null, Phaser.Tilemap.CSV)

    // music
    this.load.audio('forestMusic', '../assets/sounds/foggywoods.mp3')

    // Bakery Assets
    this.load.spritesheet('baker', '../assets/images/bakersInside/littleBaker.png', 64, 64)
    // tilesheets
    this.load.image('bakerySet', '../assets/images/bakersInside/interior.png')
    // tilemap layers
    this.load.tilemap('bakeryFloor', '../assets/images/bakersInside/bakery_floor.csv')
    this.load.tilemap('bakeryFurniture', '../assets/images/bakersInside/bakery_furniture.csv')
    this.load.tilemap('outsidewall', '../assets/images/bakersInside/bakery_outsidewall.csv')
    this.load.tilemap('onfurniture', '../assets/images/bakersInside/bakery_stuff on top of furniture.csv')
    this.load.tilemap('insidewall', '../assets/images/bakersInside/bakery_wall.csv')

    // music
    this.load.audio('bakeryMusic', '../assets/sounds/bakery.m4a')
    this.load.audio('yay', '../assets/sounds/yay.m4a')
    this.load.audio('scream', '../assets/sounds/scream.m4a')

    // other random sounds
    this.load.audio('Chicken', '../assets/sounds/chicken.m4a')
    this.load.audio('Fisherman', '../assets/sounds/fisherman.mp3')
    this.load.audio('Farmer', '../assets/sounds/farmer.mp3')
    this.load.audio('Warrior', '../assets/sounds/warrior.mp3')
    this.load.audio('Orc', '../assets/sounds/orc.mp3')
    this.load.audio('Cave','../assets/sounds/Pretty Rave Girl.mp3')
  }

  create () {
    this.state.start('StartGame')
  }
}
