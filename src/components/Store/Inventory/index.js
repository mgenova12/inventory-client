import React from "react";
import SelectDeliveryDay from './SelectDeliveryDay'
import './index.css';


class Inventory extends React.Component {

  render() {
    return (    
	    <div className="container"> 
	    	<SelectDeliveryDay />			
			</div>
    );
  }
}

export default Inventory;
