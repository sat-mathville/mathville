/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Kitten from '../sprites/Kitten'
import lang from '../lang'

export default class extends Phaser.State {
  init() { }
  preload() {
    this.load.spritesheet('boy', '../assets/images/boy.png',64,64)
    this.load.tilemap('map', '../assets/images/stations3_land_1.csv',null,Phaser.Tilemap.CSV)
    this.load.tilemap('grass', '../assets/images/stations3_grass_2.csv',null,Phaser.Tilemap.CSV)
    this.load.tilemap('stations', '../assets/images/stations3_stations_3.csv',null,Phaser.Tilemap.CSV)
    this.load.image('tileset','../assets/images/ProjectUtumno_full.png')

  }
  create() {
    // Load Map
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0,0,1920,1080)
    this.map = this.game.add.tilemap('map')
    this.grass = this.game.add.tilemap('grass')
    this.stations = this.game.add.tilemap('stations')
    this.map.addTilesetImage('tileset')
    this.grass.addTilesetImage('tileset')
    this.stations.addTilesetImage('tileset')


    // Create Layer
    this.land_1 = this.map.createLayer(0)
    this.grass_2 = this.grass.createLayer(0)
    this.stations_3 = this.stations.createLayer(0)




    this.kitten = new Kitten({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'animal'
    })

    this.boy = this.game.add.sprite(400,350,'boy')
    this.boy.scale.setTo(0.5)

    this.game.physics.arcade.enable(this.stations)
    this.stations.setCollisionBetween(0, 4, true, this.stations_3)

    this.kitten.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1, true)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.game.physics.enable(this.boy,Phaser.Physics.ARCADE)

    // this.game.add.sprite(0,0, 'animal')
    // this.kitten.scale.setTo(2,2)
  }

  update() {
    this.game.physics.arcade.collide(this.boy,this.stations)
    if(this.cursors.left.isDown)this.boy.body.velocity.x = -150;
    else if(this.cursors.right.isDown)this.boy.body.velocity.x = 150;
    else if(this.cursors.up.isDown)this.boy.body.velocity.y = -150;
    else if(this.cursors.down.isDown)this.boy.body.velocity.y = 150;
    else {
      this.boy.body.velocity.x = 0;
      this.boy.body.velocity.y = 0;
    }

    // console.log('this',this.boy)
  }

  render() {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }

}

