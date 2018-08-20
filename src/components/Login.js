import React, { Component } from 'react'
import store, {logout, auth, me, fetchAllAbilities, getProblems, getLatestAbility} from '../store'
import Game from '../main'
import {isMobile} from 'react-device-detect'

export default class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      character: 0,
      isLoggedIn: false,
      signUp: 'false'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this)
  }
  componentDidMount () {
    store.dispatch(me())
    store.dispatch(fetchAllAbilities())
    store.dispatch(getProblems())
    store.subscribe(() => {
      if (store.getState().user.id) {
        this.setState({
          isLoggedIn: true
        })
      } else this.setState({isLoggedIn: false})
    })
    // store.subscribe(() => {
    //   let userAbilitiesArr = store.getState().userAbilities
    //   if(userAbilitiesArr.length) {
    //     let latestAbilityId = userAbilitiesArr[userAbilitiesArr.length-1]
    //     store.dispatch(getLatestAbility(latestAbilityId))
    //   }
    // })
  }
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit (event) {
    event.preventDefault()
    store.dispatch(auth(this.state, 'login'))
    this.setState({
      email: '',
      password: ''
    })
  }
  handleLogout (event) {
    event.preventDefault()
    store.dispatch(logout())
  }
  handleSubmitSignUp (event) {
    event.preventDefault()
    const copyState = Object.assign({}, this.state)
    copyState.character = Number(this.state.character)
    store.dispatch(auth(copyState, 'signup'))
    this.setState({
      email: '',
      password: '',
      username: '',
      character: 0
    })
  }
  render () {
    if (isMobile) {
      return (
        <div>
        <h3>None shall enter from a mobile device!</h3>
        <p>Please view this website from your computer.</p>
        </div>
      )
    }
    if (store.getState().user.id) {
      if (!window.game)window.game = new Game()
      return (<div></div>)
    }
    if (this.state.signUp === 'false') {
      return (
        <div className='container'>

          <h1>Welcome to Mathville!</h1>
          <h2>Login</h2>
          <form className='loginForm' onSubmit={this.handleSubmit}>
            <input placeholder='Enter Email'name='email' type='text' value={this.state.email} onChange={this.handleChange}/>
            <input placeholder='Enter Password' name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
            <button className='submitButton' type='submit'>Submit</button>
          </form>
          <h2>Don’t have an account? You can...</h2>
          <button className='signUpButton' name='signUp' value='true' onClick={this.handleChange}>Sign-Up</button>
        </div>
      )
    }
    return (
      <div className='container'>
        <h1>Welcome to Mathville!</h1>
        <h2>Sign Up</h2>
        <form className='signInForm' onSubmit={this.handleSubmitSignUp}>
          <input placeholder='Enter Username' name='username' type='text' value={this.state.username} onChange={this.handleChange}/>
          <input placeholder='Enter Email' name='email' type='text' value={this.state.email} onChange={this.handleChange}/>
          <input placeholder='Enter Password'name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
          <select id='characterDropdown' name='character' onChange={this.handleChange}>
            <option value='default'>Select Character</option>
            <option value='1'>Boy</option>
            <option value='2'>Girl</option>
          </select>
          <button className='submitButton' type='submit'>Submit</button>
        </form>
        <h2>Have an account already? You can...</h2>
        <button className='submitButton'name='signUp' value='false' onClick={this.handleChange}>Login</button>
      </div>
    )
  }
}
