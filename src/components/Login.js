import React, { Component } from 'react'
import store, {logout, auth, me} from '../store'
import {Route} from 'react-router-dom'

export default class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      character:0,
      isLoggedIn: false,
      signUp: 'false',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this)
  }
  componentDidMount () {
    store.dispatch(me())
    store.subscribe(() => {
      console.log('SUBSCRIBE TEST')
      if (store.getState().user.id) {
        this.setState({
          isLoggedIn: true
        })
      } else this.setState({isLoggedIn: false})
    })
  }
  handleChange (event) {
    console.log('handle Change name', event.target.name, 'event.target.value:',event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('handleChange',this.state)
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
  handleSubmitSignUp(event){
    event.preventDefault()
    const copyState = Object.assign({},this.state)
    copyState.character = Number(this.state.character)
    store.dispatch(auth(copyState, 'signup'))
    this.setState({
      email: '',
      password: '',
      username: '',
      character:0
    })
  }
  render () {
    if(this.state.isLoggedIn)
    return( <div>Welcome, {store.getState().user.username}<button type='submit'onClick={this.handleLogout}>Logout</button></div>
    )
    if(this.state.signUp==='false'){
    return(
      <div>
         <form onSubmit={this.handleSubmit}>
          <label>Email:
          <input name='email' type='text' value={this.state.email} onChange={this.handleChange}/>
          </label>
          <label>Password:
          <input name='password' type='text' value={this.state.password} onChange={this.handleChange}/>
          </label>
          <button type='submit'>Submit</button>
        </form>
          <button name='signUp' value='true' onClick={this.handleChange}>Sign-Up</button>
          </div>
        )
      }
      return (
        <div>
        <form onSubmit={this.handleSubmitSignUp}>
        <label>Username:
        <input name='username' type='text' value={this.state.username} onChange={this.handleChange}/>
        </label>
          <label>Email:
          <input name='email' type='text' value={this.state.email} onChange={this.handleChange}/>
          </label>
          <label>Password:
          <input name='password' type='text' value={this.state.password} onChange={this.handleChange}/>
          </label>
          <label>Select Character:
          <select name='character' onChange={this.handleChange}>
            <option value='default'>--</option>
            <option value='1'>Boy</option>
            <option value='2'>Girl</option>
            <option value='3'>Animal</option>
          </select>
          </label>
          <button type='submit'>Submit</button>
        </form>
          <button name='signUp' value='false' onClick={this.handleChange}>Login</button>
          </div>
      )

  }
}
