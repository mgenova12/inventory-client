import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import NewStoreForm from './StoreLocations/NewStoreForm'
import Navbar from "./Common/Navbar"
import NewProductForm from './Products/NewProductForm'
import NewDistributorForm from './Distributors/NewDistributorForm'
import ProductTable from "./Products/ProductTable";
import PreppedProductTable from "./Products/PreppedProductTable";
import ProductShow from "./Products/ProductShow";
// import StoreGoods from "./Store/StoreGoods";

import Store from "./Store";

// import AddStoreGoods from "./StoreGoods/AddStoreGoods";
// import Locations from "./Locations";


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
	            <Route exact path="/products/:id" component={ProductShow} />
	            <Route exact path="/prepped_products" component={PreppedProductTable} />
	            
							<Route path='/store/:storeId' component={Store} />

	          </Switch>

	        </React.Fragment>
	      </BrowserRouter>		        

	    )

	}

}

export default Router