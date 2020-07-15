import React from "react";
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Store from "./Store";
import Globals from "./Globals";
import SignIn from "./SignIn";
import NewStoreForm from './Home/HomeList/NewStoreForm'


class Router extends React.Component {
	state = { 
      isLoggedIn: false,
      user: {},
      isLoading: true 
   };

	componentDidMount = () => {
		if (localStorage.getItem('token')){
	   axios.get(`${process.env.REACT_APP_API_URL}logged_in`, 	   	
	   		{ params: { token: localStorage.getItem('token') }},
	      )
	      .then(result => {
		      if (result.data.logged_in) {
		        this.handleLogin(result.data)
		      } else {
		        this.handleLogout()
		      }
	      }).then(() => this.setState({isLoading: false}))
	    .catch(error => console.log('api errors:', error))
		} else {
			this.handleLogout()
		}
	}

	handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
	 }

	handleLogout = () => {
	    this.setState({
	    	isLoggedIn: false,
	    	user: {},
	    	isLoading: false
	    })
	  }



	render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }   
	    return (
	      <BrowserRouter>
			    {!this.state.isLoggedIn &&
			       <Redirect to='/sign_in' />
			    }	      
          <Switch>
            <Route exact path="/" component={Home} />   
            <Route exact path="/stores/new" component={NewStoreForm} />        
						<Route path='/store/:storeId' component={Store} />
						<Route path='/globals' component={Globals} />
						<Route 
							path='/sign_in'
							render={props => (
	              <SignIn {...props} 
	               	loggedInStatus={this.state.isLoggedIn}
	              	handleLogin={this.handleLogin}/>
	              )}
						/>

          </Switch>

	      </BrowserRouter>		        

	    )

	}

}

export default Router