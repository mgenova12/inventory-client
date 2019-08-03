import React from "react";

class GlobalNav extends React.Component {

  render() {
    return (   
    	<div> 
				<nav className="navbar navbar-expand-lg navbar-dark">
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>
				  <a className="navbar-brand" href="/">Rusticana-Globals</a>

				  <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
				    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
				      <li className="nav-item">
				        <a className="nav-link" href="/globals/products">Products</a>
				      </li> 			 
				      <li className="nav-item">
				        <a className="nav-link" href="/globals/prepped_products">Prepped Products</a>
				      </li> 		
				      <li className="nav-item">
				        <a className="nav-link" href="/globals/distributors">Distributors</a>
				      </li> 				      
				      <li className="nav-item">	
				        <a className="nav-link" href="/globals/products/new">Add Product</a>
				      </li> 				      		           
				    </ul>
				  </div>
	            
				</nav>  

	    </div>
    );
  }
}

export default GlobalNav;
