/* globals __DEV__ */
import Phaser from 'phaser'
import store from '../store'

export default class extends Phaser.State {
 init () {}

 preload() {
  this.load.image('greenbutton', '../assets/images/greenButton.png')
 }

 create() {
   if(!store.getState().user.id){

   }
   else if(store.getState().user.id){

   }
 }
 renderPlayButton() {
  this.button1 = this.add.button(this.world.centerX,this.world.centerY, 'greenbutton', this.actionOnClick, this, 2, 1, 0);
  this.button1.anchor.setTo(0.5,0.5)
  this.button1.width = 300
  this.button1.height = 150

  this.txt = this.add.text(this.button1.x, this.button1.y, "PLAY", {font:"100px Arial", fill:"#fff", align:"center"})

  this.txt.anchor.setTo(0.5,0.5)
 }
 renderPleaseLogin(){
  this.add.text(this.world.centerX,this.world.centerY,'Please Login')
 }
 actionOnClick () {
  this.game.state.start('Game')
 }

}
