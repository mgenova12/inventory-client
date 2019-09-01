import React from "react";
import { connect } from 'react-redux'
import { getInventory } from '../../../actions/getInventory.action';
import { editInventory } from '../../../actions/editInventory.action';
import TextField from '@material-ui/core/TextField';

class InventoryTable extends React.Component {
	state = {
		quantity: []
	}

	componentDidMount = () => {
		let storeId = this.props.match.params.storeId
		this.props.onRequestInventory(storeId).then(() => console.log(this.props.onGetInventory))
	}	

	handleChange = (inventoryId) => event => {
		this.setState({
			quantity: { ...this.state.quantity, [inventoryId]: event.target.value }
		})
		this.props.onEditInventory(inventoryId, event.target.value)
	}

  render() {
  	const deliveryDay = this.props.match.params.deliveryDay
  	// console.log(this.state.quantity)
  	// console.log(this.props.onGetInventory)
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
					          <td>

				            	<TextField
				                required
				                type="number"
				                label="Quantity"
				                defaultValue={invent.quantity}
				                // value={this.state.quantity[invent.id] || ''}
				                onChange={this.handleChange(invent.id)}
				                name="name"
				                placeholder=""
				                fullWidth
				                margin="normal"
				                variant="outlined"
				                InputLabelProps={{
				                  shrink: true,
				                }}
				              />  	

					          </td>
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
  onEditInventory: editInventory
};

export default connect(mapStateToProps, mapActionsToProps)(InventoryTable);
