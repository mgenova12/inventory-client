import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import logo from '../Common/Imgs/newcroplogo.png';
import axios from "axios";
import './index.css'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
          Rusticana Inventory
      {' '}          
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


class SignIn extends React.Component {

  state = {
    email: '',
    password: '',
    errors: ''
  };

  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    };


  handleSubmit = (event) => {
    event.preventDefault()
    const {email, password} = this.state
    let user = {
      email: email,
      password: password
    }

    axios.post(`${process.env.REACT_APP_API_URL}login`, {user}, {withCredentials: true})
        .then(response => {
          if (response.data.logged_in) {
            localStorage.setItem('token', response.data.user.token)
            this.props.handleLogin(response.data)
            this.redirect()
          } else {
            this.setState({
              errors: response.data.errors
            })
          }
        })
        .catch(error => console.log('api errors:', error))
    };

    handleErrors = () => {
      return (
        <div>
          <ul>
          {this.state.errors.map(error => {
          return <div key={error} className="alert alert-danger fixed-top" role="alert"> {error}</div>
            })}
          </ul>
        </div>
      )
    }

  redirect = () => {
    this.props.history.push('/')
  }

  componentDidMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }    

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="center">
            <img src={logo} alt="Logo" width={100} height={100} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div>
            {
              this.state.errors ? this.handleErrors() : null
            }
          </div>          
          <form onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </form>         
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default SignIn;
