import React from "react";
import { Route, Switch } from "react-router-dom";
import GlobalNav from "./GlobalNav"
import Products from "./Products"
import PreppedProducts from "./PreppedProducts"
import NewProduct from "./NewProduct"
import Distributors from "./Distributors"
import ProductShow from "./Products/ProductShow"

class Globals extends React.Component {

  render() {
    return (    
	    <div>
	    	<GlobalNav/>

	      <Switch>
		      <Route exact path="/globals/products" component={Products} />
		      <Route exact path="/globals/products/new" component={NewProduct} />
		      <Route exact path="/globals/products/:id" component={ProductShow} />
		      <Route exact path="/globals/prepped_products" component={PreppedProducts} />
		      <Route exact path="/globals/distributors" component={Distributors} />
				</Switch>

	    </div>	    	
    );
  }
}

export default Globals;
