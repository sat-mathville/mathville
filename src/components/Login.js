import React, { Component } from 'react'
import store, {logout, auth, me} from '../store'
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
      signUp: 'false',
      hasError: false,
      validEmail: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this)
    this.emailValidator = this.emailValidator.bind(this)
  }
  componentDidMount () {
    store.dispatch(me())
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
    store.subscribe(() => {
      const hasError = store.getState().hasError
      if (hasError !== this.state.hasError) {
        this.setState({
          hasError: hasError
        })
      }
    })
  }
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    if (event.target.name === 'email') {
      this.setState({validEmail: this.emailValidator(event.target.value)})
    }
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
  }
  emailValidator (str) {
    const email = str || this.state.email
    const atIndex = email.indexOf('@')
    const dotIndex = email.lastIndexOf('.')
    return (atIndex > 0 && dotIndex > atIndex && email.length > (dotIndex + 2))
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
    if (this.state.isLoggedIn) {
      this.setState({
        email: '',
        password: '',
        username: '',
        character: 0
      })
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
            {this.state.validEmail ? null : <span>Invalid Email</span>}
            <input placeholder='Enter Password' name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
            {this.state.password ? null : <span>Password cannot be empty</span>}
            <button className='submitButton' type='submit' disabled={!(this.state.email && this.state.password)}>Submit</button>
            {this.state.hasError === 'Bad login' ? <span>Wrong email / password</span> : null}
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
        {this.state.hasError === 'Bad signup' ? <span>User already exists</span> : null}
        <form className='signInForm' onSubmit={this.handleSubmitSignUp}>
          <input placeholder='Enter Username' name='username' type='text' value={this.state.username} onChange={this.handleChange}/>
          {this.state.username ? null : <span>User cannot be empty</span>}
          <input placeholder='Enter Email' name='email' type='text' value={this.state.email} onChange={this.handleChange}/>
          {this.state.validEmail ? null : <span>Invalid Email</span>}
          <input placeholder='Enter Password'name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
          {this.state.password ? null : <span>Password cannot be empty</span>}
          <select id='characterDropdown' name='character' onChange={this.handleChange}>
            <option value='default'>Select Character</option>
            <option value='1'>Boy</option>
            <option value='2'>Girl</option>
          </select>
          {this.state.character ? null : <span>Please choose a character</span>}
          <button className='submitButton' type='submit' disabled={!(this.state.username && this.state.password && this.state.email && this.state.character)}>Submit</button>
        </form>
        <h2>Have an account already? You can...</h2>
        <button className='submitButton'name='signUp' value='false' onClick={this.handleChange}>Login</button>
      </div>
    )
  }
}
