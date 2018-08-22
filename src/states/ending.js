/* globals __DEV__ */
import Phaser from 'phaser'

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
  }
}
