import React, { Component } from 'react'
import Login from './components/Login'
import Chat from './components/Chat'
import { SOCKET_SERVER, API_URL} from './config/env'
import axios from 'axios'
import Echo from "laravel-echo"


const styles = {
  appstyle: {
    width:"95%",
    margin: "auto"
  }
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuth: false
    }
  }

  async _connection(token) {


    try {
      window.io = require('socket.io-client')
      window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: SOCKET_SERVER,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      })
      return
    } catch (error) {
      console.log(error)
      return
    }
  }

  async componentWillMount () {
    let token = await localStorage.getItem('token')
    if (token) {
      axios.defaults.baseURL = API_URL + 'api/'
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      await this._connection(token)
      this.setState({
        isAuth:true
      })
    }
  }

  render() {
    return (
      <div style={styles.appstyle}>

        {this.state.isAuth ? <Chat/> : <Login/>}

      </div>
    )
  }
}

export default App
