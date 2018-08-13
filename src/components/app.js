import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import store, {me} from '../store'
import Login from '../components/Login'
import PhaserGame from '../components/PhaserGame'


ReactDOM.render(
  <div>
    <Login />
    <PhaserGame />
  </div>,
  document.getElementById('app')
)
