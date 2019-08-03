import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Store from "./Store";
import Globals from "./Globals";
import NewStoreForm from './Home/HomeList/NewStoreForm'



class Router extends React.Component {
	render() {

	    return (
	      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />    
            <Route exact path="/stores/new" component={NewStoreForm} />        
						<Route path='/store/:storeId' component={Store} />
						<Route path='/globals' component={Globals} />

          </Switch>

	      </BrowserRouter>		        

	    )

	}

}

export default Router