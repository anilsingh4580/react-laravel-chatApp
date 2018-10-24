import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import red from '@material-ui/core/colors/red'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit
  }
})


class UserList extends React.Component {

  render() {
    const { classes, chatLists } = this.props
    return (
      <Grid item xs={4} >
        <Paper square className={classes.paper}>
          <List className={classes.list}>
            {chatLists.map((chat, index) => (
              <Fragment key={index}>
                <ListItem button onClick={() => this.props.onChatNowOther(index)}>
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    {chat.firstKey}
                  </Avatar>
                  {/* <ListItemText primary={chat.otherUserName} secondary={chat.message} /> */}
                  <ListItemText primary={chat.otherUserName}/>
                </ListItem>
              </Fragment>
            ))}
          </List>
        </Paper>
      </Grid>
    )
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserList)