import React from "react";
import StoreNav from "./StoreNav"

class Store extends React.Component {

  render() {
    return (    
    	<div>
	    	<StoreNav storeId={this.props.match.params.storeId} />

		    <div className="container-fluid"> 

				</div>

				
			</div>

    );
  }
}

export default Store;
