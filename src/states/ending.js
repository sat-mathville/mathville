/* globals __DEV__ */
import Phaser from 'phaser'
import store, {auth} from '../store'


export default class extends Phaser.State {
  preload () {
  }
  create () {
    const credit =
`
Created by
Bronwyn Harris
Shoshana Rosenfield
Cindy Song
Ivy Tsoi
With ❤
`
    this.txt = this.add.text(
      this.camera.x + 100,
      this.camera.y + 100,
      credit,
      {
        font: '40px Cinzel',
        fill: '#FFFFFF',
        align: 'center'
      })

    // Logout Button
    this.logoutBtn = this.game.add.button(0, 80, 'logoutBtn', this.actionOnLogout, this)
    this.logoutBtn.width = 130
    this.logoutBtn.height = 50
    this.logoutBtn.x = this.txt.x + 175
    this.logoutBtn.y = this.txt.y + 400
    this.exitTxt = this.add.text(this.logoutBtn.x+25, this.logoutBtn.y, 'Exit', {font: '40px Cinzel', fill: '#fff', align: 'center'})
  }
  actionOnLogout () {
    store.dispatch(auth({}, 'logout'))
  }
}




