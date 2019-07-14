import React from "react";
import "./index.css";

class Navbar extends React.Component {

	render() {

	    return (
				<nav className="navbar navbar-expand-lg navbar-dark">
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>
				  <a className="navbar-brand" href="/">Rusticana Inventory</a>

				  <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
				    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
				      <li className="nav-item">
				        <a className="nav-link" href="/products">Products</a>
				      </li>
				      <li className="nav-item">
				        <a className="nav-link" href="/prepped_products">Prepped Products</a>
				      </li>			      
				      <li className="nav-item">
				        <a className="nav-link" href="/distributors/new">New Distributor</a>
				      </li>			
				      <li className="nav-item">
				        <a className="nav-link" href="/products/new">New Product</a>
				      </li>	 			      
				    </ul>
				  </div>

				    
				    <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
				        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
				            <li className="nav-item">
				                <a className="nav-link" href="/">Log In</a>
				            </li>
				            <li className="nav-item">
				                <a className="nav-link" href="/">Log Out</a>
				            </li>
				        </ul>
				    </div>		    
				</nav>   
	    )
	}

}

export default Navbar
