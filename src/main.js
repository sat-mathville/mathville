import 'pixi'
import 'p2'
import Phaser from 'phaser'
import React from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import HouseState from './states/House'
import StartState from './states/StartGame'
import WizardHouseState from './states/WizardHouse'
import BakerShopState from './states/BakerShopInside'
import ForestState from './states/ForbiddenForest'


import config from './config'



class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('StartGame', StartState, false)
    this.state.add('WizardHouse', WizardHouseState, false)
    this.state.add('BakerShopInside', BakerShopState, false)
    this.state.add('House', HouseState, false)
    this.state.add('ForbiddenForest', ForestState, false)

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Boot')
    }
  }
}

window.game = new Game()

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}

ReactDOM.render(<Login />,
  document.getElementById('app')
)
