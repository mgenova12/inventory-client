import React from "react";
import "./index.css";
import Button from '@material-ui/core/Button';

import Stores from '../Stores'

class Home extends React.Component {


  render() {
    return (    
	    <div className="container"> 
				<div className="list-group">
					<h4>Management Center</h4> 
		  			<a href="/" className="list-group-item list-group-item-action list-group-item-light">Financials</a>
		  			<a href="/products" className="list-group-item list-group-item-action list-group-item-light">Global Products</a>
		  			<a href="/" className="list-group-item list-group-item-action list-group-item-light">Product Prices</a>
		  			<a href="/" className="list-group-item list-group-item-action list-group-item-light">Manage Users</a>
				</div>

	      <Stores/>
	      <br/>
	      <a href="/stores/new">
	      	<Button variant="contained" color="primary">
	        	Add Store
	      	</Button>
	      </a>

		</div>
    );
  }
}

export default Home;
