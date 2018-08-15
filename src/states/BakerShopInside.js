import Phaser from 'phaser'
import store from '../store'

export default class extends Phaser.State {
    preload () {
        const userCharacter = () => {
          if (store.getState().user.character === 1) return '../assets/images/boy.png'
          else if (store.getState().user.character === 2) return '../assets/images/girl.png'
          else if (store.getState().user.character === 3) return '../assets/images/cat_fighter_sprite1.png'
        }
        //characters
        this.load.spritesheet('boy', userCharacter(), 64, 64)
        this.load.spritesheet('baker', '../assets/images/bakersInside/littleBaker.png', 163, 185)
        //tilesheets
        this.load.image('restaurant', '../assets/images/bakersInside/restaurant.png')
        this.load.image('baker', '../assets/images/bakersInside/baker.png')
        //tilemap layers
        this.load.tilemap('counter','../assets/images/bakersInside/FinalBakerShop._counter.csv')
        this.load.tilemap('ground','../assets/images/bakersInside/FinalBakerShop._ground.csv')
        this.load.tilemap('restaurant','../assets/images/bakersInside/FinalBakerShop._restaurant tileset.csv')
        this.load.tilemap('layer1','../assets/images/bakersInside/FinalBakerShop._Tile Layer 1.csv')
        this.load.tilemap('wallitems','../assets/images/bakersInside/FinalBakerShop._wall items.csv')
        this.load.tilemap('wall','../assets/images/bakersInside/FinalBakerShop._wall.csv')
        this.load.tilemap('windows','../assets/images/bakersInside/FinalBakerShop._windows.csv')
    }

    create(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.game.world.setBounds(0, 0, 1024, 640)
        this.ground = this.game.add.tilemap('ground') 
        this.bakerGround = this.ground.createLayer(0)
        
        this.wall = this.game.add.tilemap('wall')

    }

}