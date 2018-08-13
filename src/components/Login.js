import React, { Component } from 'react'
import store, {me} from '../store'

export default class extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      isLoggedIn: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await store.dispatch(me())
    store.subscribe(()=> {
      if(store.getState().user.id) {
        this.setState({
          isLoggedIn: true
        })
      }
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    // add in thunk

  }
  render () {
    return(
      (this.state.isLoggedIn) ? `Welcome, ${store.getState().user.username}` :
      (
        <form onSubmit={this.handleSubmit}>
          <input name='username' type='text' value={this.state.username} onChange={this.handleChange}/>
          <input name='email' type='text' value={this.state.email} onChange={this.handleChange}/>
          <input name='password' type='text' value={this.state.password} onChange={this.handleChange}/>
        </form>
      )

    )
  }
}
