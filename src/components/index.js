import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";


import Home from "./Home";
import NewStoreForm from './Stores/NewStoreForm'
import Products from "./Products";
import Navbar from "./Common/Navbar"

class Router extends React.Component {

	render() {
	    return (
	      <BrowserRouter>
	        <React.Fragment>
	          <Navbar/>
	          <Switch>
	            <Route exact path="/" component={Home} />
	            <Route exact path="/stores/new" component={NewStoreForm} />
	            <Route exact path="/products" component={Products} />
	          </Switch>

	        </React.Fragment>
	      </BrowserRouter>		        

	    )

	}

}

export default Router