import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import red from '@material-ui/core/colors/red'
import Input from '@material-ui/core/Input'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import CloseIcon from '@material-ui/icons/Close'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import axios from 'axios'
import moment from 'moment'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    paddingBottom: 50,
    maxHeight:350,
    overflowY: 'scroll'
  },
  card: {
    marginTop:20
  },
  list: {
    marginBottom: theme.spacing.unit * 2
  },
  avatar: {
    backgroundColor: red[500]
  },
  time: {
    textAlign: 'right'
  },
  OtherTime: {
    textAlign: 'left'
  },
  button: {
    margin: theme.spacing.unit
  },
  textinput: {
    width: '80%'
  },
  media: {
    minHeight: 200,
    maxWidth: 200,
    margin: 'auto'
  },
  othertext: {
    textAlign: "left"
  }
})

class ChatBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      messages: props.messages,
      image_show: [],
      message: '',
      myId: props.messages[0].myId,
      myName: props.messages[0].myName,
      otherUserName: props.messages[0].otherUserName,
      channelID : props.messages[0].channelID,
      myFirstKey:  props.messages[0].myFirstKey
    }
    this.fileInput = React.createRef()
    this.messagesEnd = React.createRef()

  }

  _updatevalue() {
    var data = {
      created_at:{date:moment()},
      isMe:true,
      message:this.state.message,
      images: this.state.image_show,
      userKey:this.state.myFirstKey
    }

    var messages = this.state.messages
    messages.push(data)
    this.messagesEnd.current.scrollTop = this.messagesEnd.current.scrollHeight
    this.setState({
      messages,
      image_show:[],
      message: ''
    })
  }

  async _send() {

    if (!this.state.message && this.state.image_show.length === 0) {
      return
    }
    try {
      const datasend = {
        message: this.state.message,
        images: this.state.image_show
      }
      await this._updatevalue()
      let response = await axios.post('send_message/'+this.state.channelID, datasend)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  _livechat(channelId) {
    window.Echo.private(`chat.${channelId}`)
    .listen('MessageSend', (e) => {
      console.log(e, 1)
    }).listenForWhisper('typing', (e) => {
      console.log(e, 2)
    })
  }

  componentWillMount(){
    this._livechat(this.props.messages[0].channelID)

  }

  componentDidMount() {
    this.messagesEnd.current.scrollTop = this.messagesEnd.current.scrollHeight
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  _onFileChange (e) {
    var reader, files = e.target.files
    if (files.length === 0) {
      return console.log("no file ADDED")
    }
    reader = new FileReader()
    reader.onload = (e) => {
      var images = this.state.image_show
      images.unshift(e.target.result)
      this.setState({
        image_show: images
      })

    }
    reader.readAsDataURL(files[0])
  }

  render() {
    const { classes } = this.props

    return (
      <div>

        <div ref={this.messagesEnd} className={classes.paper}>
          <Paper square  >
            {
              this.state.image_show.length > 0 ? <div style={{margin:'auto', textAlign: 'center'}}>
              <img  src={this.state.image_show[0]} alt="Smiley face" height="200" width="200"></img> </div>: null
            }
            <List className={classes.list}>
              {
                this.state.image_show.length > 0 ? null : this.state.messages.map((message, index) => (
                  <Fragment key={index}>
                    {
                      message.isMe ? <ListItem button>
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                          {message.userKey}
                        </Avatar>
                        <ListItemText className={classes.othertext} secondary={message.message} />
                        {message.images.length > 0 ? <div>
                        <img  src={message.images[0]} alt="Smiley face" height="200" width="200"></img> </div>: null}
                        <ListItemText className={classes.time} secondary={moment(message.created_at.date).utcOffset('+05:30').fromNow()} />
                      </ListItem> :

                      <ListItem button>

                        <ListItemText className={classes.OtherTime} secondary={moment(message.created_at.date).utcOffset('+05:30').fromNow()} />
                        <ListItemText className={classes.time} secondary={message.message} />
                        {message.images.length > 0 ? <div >
                        <img  src={message.images[0]} alt="Smiley face" height="200" width="200"></img> </div>: null}
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                          {message.userKey}
                        </Avatar>
                      </ListItem>
                    }
                  </Fragment>
                ))
              }
            </List>

          </Paper>
        </div>

        <Card className={classes.card}>
          <Input
              id="message"
              multiline
              rowsMax="4"
              className={classes.textinput}
              value={this.state.message}
              onChange={this.handleChange('message')}
          />

          <input style={{display:'none'}} ref={this.fileInput} type="file" onChange={(e) =>  this._onFileChange(e)}/>

          {this.state.image_show.length > 0 ? null : <Button variant="fab" aria-label="Send" className={classes.button}
            onClick={() => this.fileInput.current.click()}>
            <AttachFileIcon/>
          </Button>}

          {this.state.image_show.length > 0 ?  <Button variant="fab" aria-label="Send" className={classes.button}
            onClick={() => this.setState({image_show:[]})}>
            <CloseIcon/>
          </Button>: null }

          {this.state.image_show.length > 0 || this.state.message ?
            <Button variant="fab" color="primary" aria-label="Send" className={classes.button} onClick={() => this._send()}>
            <SendIcon/>
          </Button> : null}

        </Card>
      </div>
    )
  }
}

ChatBox.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatBox)