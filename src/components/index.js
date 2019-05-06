import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";


import Home from "./Home";
import NewStoreForm from './Stores/NewStoreForm'
import Navbar from "./Common/Navbar"
import NewProductForm from './Products/NewProductForm'
import NewDistributorForm from './Distributors/NewDistributorForm'
import ProductTable from "./Products/ProductTable";

class Router extends React.Component {

	render() {
	    return (
	      <BrowserRouter>
	        <React.Fragment>
	          <Navbar/>
	          <Switch>
	            <Route exact path="/" component={Home} />
	            <Route exact path="/stores/new" component={NewStoreForm} />
	            <Route exact path="/products" component={ProductTable} />
	            <Route exact path="/products/new" component={NewProductForm} />
	            <Route exact path="/distributors/new" component={NewDistributorForm} />

	          </Switch>

	        </React.Fragment>
	      </BrowserRouter>		        

	    )

	}

}

export default Router