import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRECT, LOGIN_URL } from '../config/env'
import axios from 'axios'


const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
})

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username:'',
      password: '',
      isLoading: false
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  async onSubmitForm() {

    if (!this.state.username || !this.state.password) {
      return
    }

    this.setState({
      isLoading: true
    })

    try {
      const data = {
        grant_type:'password',
        client_id: OAUTH_CLIENT_ID,
        client_secret: OAUTH_CLIENT_SECRECT,
        username:this.state.username,
        password:this.state.password
      }
      let response = await axios.post(LOGIN_URL, data)
      await localStorage.setItem('token', response.data.access_token)
      window.location.reload()
    } catch (error) {
      alert("Opps somthing went wrong!")
      console.log(error)
      this.setState({
        isLoading: false
      })
    }
  }


  render() {
    const { classes } = this.props
    return (
      <div>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                  name="email"
                  type="email"
                  id="email"
                  autoComplete="current-email"
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                />

              </FormControl>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => this.onSubmitForm()}
              >
                {this.state.isLoading ? 'Loging...' : 'Sign in'}
              </Button>
            </form>
          </Paper>
        </main>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)