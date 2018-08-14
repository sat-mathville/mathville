/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Kitten from '../sprites/Kitten'
import lang from '../lang'
import store, {getProblems} from '../store'


export default class extends Phaser.State {
  init() { }
  preload() {
    const userCharacter = () => {
      if(store.getState().user.character===1)return '../assets/images/boy.png'
      else if (store.getState().user.character===2)return '../assets/images/girl.png'
      else if(store.getState().user.character===3)return '../assets/images/cat_fighter_sprite1.png'
    }
    this.load.spritesheet('boy', userCharacter(),64,64)
    this.load.tilemap('map', '../assets/images/stations3_land_1.csv',null,Phaser.Tilemap.CSV)
    this.load.tilemap('grass', '../assets/images/stations3_grass_2.csv',null,Phaser.Tilemap.CSV)
    this.load.tilemap('stations', '../assets/images/stations3_stations_3.csv',null,Phaser.Tilemap.CSV)
    this.load.tilemap('details', '../assets/images/stations3_details_4.csv',null,Phaser.Tilemap.CSV)
    this.load.image('tileset','../assets/images/ProjectUtumno_full.png')

  }
  create() {
    // Load Map
    store.dispatch(getProblems())
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0,0,1920,1080)
    this.map = this.game.add.tilemap('map')
    this.grass = this.game.add.tilemap('grass')
    this.stations = this.game.add.tilemap('stations')
    this.details = this.game.add.tilemap('details')
    this.map.addTilesetImage('tileset')
    this.grass.addTilesetImage('tileset')
    this.stations.addTilesetImage('tileset')
    this.details.addTilesetImage('tileset')


    // Create Layer
    this.land_1 = this.map.createLayer(0)
    this.grass_2 = this.grass.createLayer(0)
    this.stations_3 = this.stations.createLayer(0)
    this.details_4 = this.details.createLayer(0)

    this.boy = this.game.add.sprite(400,350,'boy')
    this.boy.scale.setTo(0.75)
    this.boy.animations.add('walkUp', [104,105,106,107,108,109,110,111,112], null, true)
    this.boy.animations.add('walkLeft', [117,118,119,120,121,122,123,124,125], null, true)
    this.boy.animations.add('walkDown', [130,131,132,133,134,135,136,137,138], null, true)
    this.boy.animations.add('walkRight', [143,144,145,146,147,148,149,150,151], null, true)
    this.game.physics.arcade.enable(this.stations)
    this.stations.setCollisionBetween(0,6080, true, this.stations_3)


    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.game.physics.enable(this.boy,Phaser.Physics.ARCADE)
    this.boy.body.collideWorldBounds = true;

    this.camera.follow(this.boy)

    // this.game.add.sprite(0,0, 'animal')
    // this.kitten.scale.setTo(2,2)
  }

  update() {

    this.game.physics.arcade.collide(this.boy,this.stations_3, () => {
      this.game.state.start('House')
    })
    if(this.cursors.left.isDown){
      this.boy.body.velocity.x = -200
      this.boy.animations.play('walkLeft', 40, true)
    }
    else if(this.cursors.right.isDown){
      this.boy.body.velocity.x = 200
      this.boy.animations.play('walkRight', 40, true)
    }
    else if(this.cursors.up.isDown){
      this.boy.body.velocity.y = -200
      this.boy.animations.play('walkUp', 40, true)
    }
    else if(this.cursors.down.isDown){
      this.boy.body.velocity.y = 200
      this.boy.animations.play('walkDown', 40, true)
    }
    else {
      this.boy.body.velocity.x = 0;
      this.boy.body.velocity.y = 0;
      this.boy.animations.stop();
    }

    // console.log('this',this.boy)
  }

  render() {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }

}

