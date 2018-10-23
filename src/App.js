import React, { Component } from 'react'
import Login from './components/Login'
import Chat from './components/Chat'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuth: false
    }
  }
  async componentWillMount () {
    let token = await localStorage.getItem('token')
    if (token) {
      this.setState({
        isAuth:true
      })
    }
  }

  render() {
    return (
      <div>

        {this.state.isAuth ? <Chat/> : <Login/>}

      </div>
    )
  }
}

export default App
