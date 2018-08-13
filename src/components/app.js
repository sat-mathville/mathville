import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import store, {me} from '../store'
import Login from '../components/Login'
import PhaserGame from '../components/PhaserGame'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
    <Login />
    {/* <PhaserGame /> */}
    </BrowserRouter>,
  document.getElementById('app')
)
