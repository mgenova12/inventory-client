import React from "react";
import AddToInventoryTable from './AddToInventoryTable'


class AddToInventory extends React.Component {

  render() {
    return (    
	    <div> 
	    	<AddToInventoryTable storeId={this.props.match.params.storeId}/>		
			</div>
    );
  }
}

export default AddToInventory;
