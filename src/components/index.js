import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Products from "./Products";

class Router extends React.Component {

	render() {
	    return (
	      <BrowserRouter>
	        <React.Fragment>
	          <Switch>
	            <Route exact path="/" component={Products} />
	          </Switch>

	        </React.Fragment>
	      </BrowserRouter>		        

	    )

	}

}

export default Router