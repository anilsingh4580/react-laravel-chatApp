import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import red from '@material-ui/core/colors/red'
import Avatar from '@material-ui/core/Avatar'
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    backgroundColor: red[500],
  }
}

class ChatHeader extends React.Component {

  render() {
    const { classes, userName, firstKey } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {userName}
            </Typography>
            <IconButton
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {firstKey}
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

ChatHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatHeader)