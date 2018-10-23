import React, { Component } from 'react'
import UserList from './UserList'
class Chat extends Component {
  render() {
    return (
      <div className={{flexGrow: 1}}>
        <div>
          <h1>
            Chat
          </h1>
        </div>
        <div>
          <h1>
            <UserList/>
          </h1>
        </div>
      </div>
    )
  }
}

export default Chat
