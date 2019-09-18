import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getInventoryOrder } from '../../../actions/getInventoryOrder.action';


class OrderShow extends React.Component {
	
	// measuementLabel = (inventoryOrder) => {
	// 	if(inventoryOrder.storeGood.countBy.name === '%'){
	// 		return 'EA'
	// 	} else if (inventoryOrder.storeGood.replenishByEach){
	// 		return 'EA'
	// 	} else if (inventoryOrder.storeGood.product.caseQuantity){
	// 		return 'CASE'
	// 	} else {
	// 		return `${inventoryOrder.storeGood.countBy.name}`
	// 	}
	// }

	componentDidMount = () => {
		let storeId = this.props.match.params.storeId
		let orderId = this.props.match.params.orderId
		this.props.onRequestInventoryOrder(storeId, orderId)
	}	

  render() {
    return (    
   	<div> 
	    	<h3 align="center"> Final Order </h3>
	    	<div className="table-responsive">
				  <table className="table table-striped">
				    <thead>
				      <tr>
				        <th>Product</th>
				        <th>Current Quantity</th>
				        <th>Quantity Needed</th>
				      </tr>
				    </thead>
	
				    <tbody>
					    {this.props.onGetInventoryOrder.map((inventoryOrder) => (
				      <tr key={inventoryOrder.id} >
				        <td>{inventoryOrder.storeGood.product.name}</td>
				        <td>{inventoryOrder.quantity} {inventoryOrder.storeGood.countBy.name}</td>
				        <td>{inventoryOrder.quantityNeeded} {inventoryOrder.storeGood.replenishBy}</td>
				      </tr>
				    ))}
				    </tbody>

				  </table>

			  </div>
		  </div>
    );
  }
}

const mapStateToProps = state => ({
  onGetInventoryOrder: state.orderReducer.inventoryOrder,
});

const mapActionsToProps = {
  onRequestInventoryOrder: getInventoryOrder,
};


export default connect(mapStateToProps, mapActionsToProps)(withRouter(OrderShow));
