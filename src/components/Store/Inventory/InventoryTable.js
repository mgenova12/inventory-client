import React from "react";
import { connect } from 'react-redux'
import { getInventory } from '../../../actions/getInventory.action';

class InventoryTable extends React.Component {

	componentDidMount = () => {
		let storeId = this.props.match.params.storeId
		this.props.onRequestInventory(storeId)
	}	

  render() {
  	const deliveryDay = this.props.match.params.deliveryDay
    return (    
    	<div> 
	    	<h3 align="center"> Inventory For {deliveryDay} </h3>
	    	<div className="table-responsive">
				  <table className="table table-striped">
				    <thead>
				      <tr>
				        <th>Product</th>
				        <th>Count By</th>
				        <th>Quantity</th>
				      </tr>
				    </thead>
				    { this.props.onGetInventory.map((inventory) => (
				     <thead key={inventory.id}>
				        <tr > 
				          <th className="location-header" colSpan="3">{inventory.name}</th>
				        </tr>
				        { inventory.inventories.map((invent) => (
				        	(invent.storeGood &&
					        <tr key={invent.id}> 
					          <td>{invent.storeGood.product.name}</td>
					          <td>{invent.storeGood.countBy.name}</td>
					          <td></td>
					        </tr>
					      	)
				      	))}
				     </thead>
		
				     ))
				   	}
				    <tbody>

				    </tbody>

				  </table>
			  </div>
		  </div>

    );
  }
}

const mapStateToProps = state => ({
  onGetInventory: state.inventoryReducer.inventory,
});

const mapActionsToProps = {
  onRequestInventory: getInventory,
};

export default connect(mapStateToProps, mapActionsToProps)(InventoryTable);
