import React, { Component } from 'react'
import store, {logout, auth, me} from '../store'
import {Route} from 'react-router-dom'

export default class Login extends Component {
  constructor () {
    super()
    this.state = {
      // username: '',
      email: '',
      password: '',
      isLoggedIn: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
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
    console.log('handle Change', this.state)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit (event) {
    event.preventDefault()
    store.dispatch(auth(this.state.email, this.state.password, 'login'))
    this.setState({
      email: '',
      password: ''
    })
  }
  handleLogout (event) {
    event.preventDefault()
    console.log('HANDLE LOGOUT')
    store.dispatch(logout())
  }
  render () {
    console.log('Return TEST', store.getState().user)
    return (
      (this.state.isLoggedIn) ? <div>Welcome, {store.getState().user.username}<button type='submit'onClick={this.handleLogout}>Logout</button></div>

        : <form onSubmit={this.handleSubmit}>
          <label>Email:
          <input name='email' type='text' value={this.state.email} onChange={this.handleChange}/>
          </label>
          <label>Password:
          <input name='password' type='text' value={this.state.password} onChange={this.handleChange}/>
          </label>
          <button type='submit'>Submit</button>
        </form>

    )
  }
}
