import React from "react";


class StoreGoods extends React.Component {

  render() {
    return (    
	    <div className="container-fluid"> 
	    
	    	<h3>Products for {this.props.match.params.storeId}</h3>
				
			</div>
    );
  }
}

export default StoreGoods;
