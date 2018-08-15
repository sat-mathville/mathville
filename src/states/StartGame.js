/* globals __DEV__ */
import Phaser from 'phaser'
import store, {getProblems} from '../store'

export default class extends Phaser.State {
 preload() {
  this.load.image('playBtn', '../assets/images/playBtn.png')

 }

 update() {
   if(!store.getState().user.id){
    this.renderPleaseLogin()
  }
   else if(store.getState().user.id){
    this.renderPlayButton()
   }
 }

 renderPlayButton() {
  if(this.pleaseLogin){
    this.pleaseLogin.destroy()
  }
  if(!this.button1){
    this.button1 = this.add.button(this.world.centerX,this.world.centerY, 'playBtn', this.actionOnClick, this, 2, 1, 0);
    this.button1.anchor.setTo(0.5,0.5)
    // this.button1.width = 300
    // this.button1.height = 150

    this.txt = this.add.text (this.button1.x, this.button1.y, "START",  {font:"80px Times", fill:"#fff", align:"center"})

    this.txt.anchor.setTo(0.5,0.5)
  }

 }
 renderPleaseLogin(){
  if(this.button1){
    this.button1.destroy()
    this.txt.destroy()
  }
  if(!this.pleaseLogin){
    this.pleaseLogin = this.add.text(this.world.centerX,this.world.centerY,'Please Login')
  }
 }
 actionOnClick () {
  this.game.state.start('Game')
 }

}
