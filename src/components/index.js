import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Products from "./Products";
import Navbar from "./Common/Navbar"

class Router extends React.Component {

	render() {
	    return (
	      <BrowserRouter>
	        <React.Fragment>
	          <Navbar/>
	          <Switch>
	            <Route exact path="/products" component={Products} />
	          </Switch>

	        </React.Fragment>
	      </BrowserRouter>		        

	    )

	}

}

export default Router