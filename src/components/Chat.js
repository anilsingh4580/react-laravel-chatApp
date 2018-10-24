import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import red from '@material-ui/core/colors/red'
import CircularProgress from '@material-ui/core/CircularProgress'

import ChatHeader from './ChatHeader'
import ChatBox from './ChatBox'
import ChatList from './UserList'
import axios from 'axios'

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  },
  card: {
    maxWidth: 400,
  },
  avatar: {
    backgroundColor: red[500],
  },
  progress: {
    margin: theme.spacing.unit * 2,
  }
})


class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatLists: [],
      isLoading: false,
      userName: '',
      firstKey: '',
      currentIndex: 0,
      messages: [],
      chatData: {}
    }
  }

  async fetchChatLists() {
    this.setState({
      isLoading: true
    })
    try {
      let response = await axios.get('chat_list')
      var data = response.data.data
      this.setState({
        chatLists: data,
        userName:  data.length >0 ? data[0].otherUserName : '',
        firstKey: data[0].firstKey
      })
      this._allMessages(data[0].channelID)
    }catch (error) {
      console.log(error)
      this.setState({
        isLoading: false
      })
    }
  }

  async _allMessages(channelID) {
    try {
      let response = await axios.get("messages/"+channelID)
      this.setState({
        isLoading: false,
        messages: response.data.data
      })
    } catch (error) {
      console.log(error)
      this.setState({
        isLoading: false
      })
    }
  }

  _chatNow(index) {
    if (this.state.currentIndex  === index) {
      return
    }
    var chatData = this.state.chatLists[index]
    this.setState({
      userName: chatData.otherUserName,
      firstKey:chatData.firstKey,
      currentIndex: index,
      isLoading: true
    })
    this._allMessages(chatData.channelID)
  }

  _handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  componentWillMount() {
    this.fetchChatLists()
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <ChatHeader firstKey={this.state.firstKey} userName={this.state.userName}/>
            {this.state.isLoading ? <CircularProgress className={classes.progress} size={50} /> :
            <ChatBox chatData={this.state.chatData} messages={this.state.messages}/> }
          </Grid>
          <ChatList onChatNowOther={(index) => this._chatNow(index)} chatLists={this.state.chatLists}/>
        </Grid>
      </div>
    )
  }
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Chat)