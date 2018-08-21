/* globals __DEV__ */
import Phaser from 'phaser'
import store, {setCoord, fetchAllAbilities, getProblems} from '../store'

export default class extends Phaser.State {
  preload () {
    this.load.image('playBtn', '../assets/images/playBtn.png')
    store.dispatch(setCoord([450, 500]))
    store.dispatch(fetchAllAbilities())
    store.dispatch(getProblems())
  }
  create () {
    this.renderPlayButton()
  }
  renderPlayButton () {
    this.button1 = this.add.button(this.world.centerX, this.world.centerY, 'playBtn', this.actionOnClick, this, 2, 1, 0)
    this.button1.anchor.setTo(0.5, 0.5)

    this.txt = this.add.text(this.button1.x, this.button1.y, 'Start', {font: '80px Cinzel', fill: '#fff', align: 'center'})

    this.txt.anchor.setTo(0.5, 0.5)
  }
  actionOnClick () {
    this.game.state.start('Game')
  }
}
