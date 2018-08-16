import React, { Component } from 'react'
import store, {logout, auth, me, fetchAllAbilities, getProblems} from '../store'

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
  }
  handleChange (event) {
    console.log('handle Change name', event.target.name, 'event.target.value:', event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('handleChange', this.state)
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
    if (this.state.isLoggedIn)
    {
return (<div className='container'>Welcome, {store.getState().user.username}<button id='logoutButton' type='submit'onClick={this.handleLogout}>Logout</button></div>
    )
}
    if (this.state.signUp === 'false') {
      return (
        <div className='container'>
        <h1>Welcome to Mathville!</h1>
          <form className='loginForm' onSubmit={this.handleSubmit}>
            <label>Email:
            <input placeholder='Enter Email'name='email' type='text' value={this.state.email} onChange={this.handleChange}/>
            </label>
            <label>Password:
            <input placeholder='Enter Password' name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
            </label>
            <button className='submitButton' type='submit'>Submit</button>
          </form>
          <button className='signUpButton' name='signUp' value='true' onClick={this.handleChange}>Sign-Up</button>
        </div>
      )
    }
    return (
      <div className='container'>
      <h1>Welcome to Mathville!</h1>
        <form className='signInForm' onSubmit={this.handleSubmitSignUp}>
          <label>Username:
          <input placeholder='Enter Username' name='username' type='text' value={this.state.username} onChange={this.handleChange}/>
          </label>
          <label>Email:
          <input placeholder='Enter Email' name='email' type='text' value={this.state.email} onChange={this.handleChange}/>
          </label>
          <label>Password:
          <input placeholder='Enter Password'name='password' type='text' value={this.state.password} onChange={this.handleChange}/>
          </label>
          <label>Select Character:
          <select id='characterDropdown' name='character' onChange={this.handleChange}>
            <option value='default'>--</option>
            <option value='1'>Boy</option>
            <option value='2'>Girl</option>
            <option value='3'>Animal</option>
          </select>
          </label>
          <button className='submitButton' type='submit'>Submit</button>
        </form>
        <button className='submitButton'name='signUp' value='false' onClick={this.handleChange}>Login</button>
      </div>
    )
  }
}
