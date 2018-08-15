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
        this.load.image('restaurantSet', '../assets/images/bakersInside/restaurant.png')
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

        //going to ignore windows for now since I didn't end up putting any windows
        
        //add baker sprite somewhere
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.game.world.setBounds(0, 0, 1024, 640)
        this.ground = this.game.add.tilemap('ground') 
        this.ground.addTilesetImage('baker')
        this.bakerGround = this.ground.createLayer(0)
        
        this.wall = this.game.add.tilemap('wall')
        this.wall.addTilesetImage('baker')
        this.bakerWall = this.wall.createLayer(0)
        this.game.physics.arcade.enable(this.wall)
        this.wall.setCollisionBetween(0, 6080, true, this.bakerWall)

        this.counter = this.game.add.tilemap('counter')
        this.counter.addTilesetImage('baker')
        this.bakerCounter = this.counter.createLayer(0)
        this.game.physics.arcade.enable(this.counter)
        this.counter.setCollisionBetween(0, 6080, true, this.bakerCounter)

        this.restaurant = this.game.add.tilemap('restaurant')
        this.restaurant.addTilesetImage('restaurantSet')
        this.bakerRestaurant = this.restaurant.createLayer(0)
        this.game.physics.arcade.enable(this.restaurant)
        this.restaurant.setCollisionBetween(0, 6080, true, this.bakerRestaurant)

        this.wallitems = this.game.add.tilemap('wallitems')
        this.wallitems.addTilesetImage('baker')
        this.bakerWallItems = this.wallitems.createLayer(0)
        this.game.physics.arcade.enable(this.wallitems)
        this.wallitems.setCollisionBetween(0, 6080, true, this.bakerWallItems)

        this.boy = this.game.add.sprite(this.world.centerX, this.world.centerY, 'boy')
        this.baker = this.game.add.sprite(this.world.centerX, this.world.centerY + 150)
        this.boy.scale.setTo(1)
        this.baker.scale.setTo(1)
        this.cursors = this.game.input.keyboard.createCursorKeys()
        this.game.physics.enable(this.boy, Phaser.Physics.ARCADE)
        this.game.physics.enable(this.baker, Phaser.Physics.ARCADE)
        this.boy.body.collideWorldBounds = true
        this.camera.follow(this.boy)

        this.boy.animations.add('walkUp', [104, 105, 106, 107, 108, 109, 110, 111, 112], null, true)
        this.boy.animations.add('walkLeft', [117, 118, 119, 120, 121, 122, 123, 124, 125], null, true)
        this.boy.animations.add('walkDown', [130, 131, 132, 133, 134, 135, 136, 137, 138], null, true)
        this.boy.animations.add('walkRight', [143, 144, 145, 146, 147, 148, 149, 150, 151], null, true)
        //add animations for the baker?
    }

    update(){
        this.game.physics.arcade.collide(this.boy, this.bakerWall)
        this.game.physics.arcade.collide(this.boy, this.bakerCounter)
        this.game.physics.arcade.collide(this.boy, this.bakerRestaurant)
        this.game.physics.arcade.overlap(this.boy, this.baker, () => {
            this.game.state.start('House')
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

}