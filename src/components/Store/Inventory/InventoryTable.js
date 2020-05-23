import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getInventory } from '../../../actions/getInventory.action';
import { editInventory } from '../../../actions/editInventory.action';
import { editInventoryQuantityNeeded } from '../../../actions/editInventoryQuantityNeeded.action';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class InventoryTable extends React.Component {
	state = {
		quantity: []
	}

	componentDidMount = () => {
		let storeId = this.props.match.params.storeId
		this.props.onRequestInventory(storeId)
	}	

	handleChange = (inventoryId) => event => {
		this.setState({
			quantity: { ...this.state.quantity, [inventoryId]: event.target.value }
		})
		this.props.onEditInventory(inventoryId, event.target.value)
	}

	handleSubmit = (event) => {
		event.preventDefault()
		let storeId = this.props.match.params.storeId
		this.props.onEditInventoryQuantityNeeded(storeId).then(() => this.props.history.push(`/store/${storeId}/Success`))
	}

  render() {
  	const deliveryDay = this.props.match.params.deliveryDay
  	let title  = (
		  deliveryDay === 'true' ? 'Prepped' :  
		  deliveryDay === 'false' ? 'Non-Prepped' :  
		  deliveryDay
		);
    return (    
    	<div> 
	    	<h3 align="center"> Inventory For {title} </h3>
	    	<div className="table-responsive">
	    	<form onSubmit={this.handleSubmit}>
				  <table className="table table-striped">
				    <thead>
				      <tr>
				        <th>Product</th>
				        <th>Count By</th>
				        <th>Quantity</th>
				      </tr>
				    </thead>
				    { this.props.onGetInventory.map((location) => (
				     <thead key={location.id}>
				        <tr > 
				          <th className="location-header" colSpan="3">{location.name}</th>
				        </tr>
				        { location.inventories.map((invent) => (
				        	(invent.storeGood && invent.storeGood.product &&
					        <tr key={invent.id}> 
					          <td>{invent.storeGood.product.name}</td>
					          <td>{invent.storeGood.countBy.name}</td>
					          <td>
					          {invent.storeGood.countBy.name !== '%' ? (
				            	<TextField
				                required
				                type="number"
				                label="Quantity"
				                defaultValue={invent.quantity}
				                onChange={this.handleChange(invent.id)}
				                name="name"
				                placeholder={invent.storeGood.product.caseQuantity ? `${invent.storeGood.product.caseQuantity} in each case. Count by Item.` : '' }
				                fullWidth
				                margin="normal"
				                variant="outlined"
				                InputLabelProps={{
				                  shrink: true,
				                }}
				              />  	

				              ) : (
				              
					            <TextField
					                select
					                label="Quantity"
					                name="Quantity"
					                defaultValue={invent.quantity}
					                placeholder="Select Quantity"
					                fullWidth
					                onChange={this.handleChange(invent.id)}
					                margin="normal"
					                variant="outlined"
					                InputLabelProps={{
					                  shrink: true,
					                }}
					                required
					                SelectProps={{
					                  native: true,
					                }}              
					              >
					              <option key='' value=''></option>
					              <option key='0' value='0'>0%</option>
					              <option key='25' value='25'>25%</option>
					              <option key='50' value='50'>50%</option>
					              <option key='75' value='75'>75%</option>
					              <option key='100' value='100'>100%</option>
					          	</TextField>
				              )}
				         
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
				  <div align="center"> 
           <Button size='large' type='submit' variant="contained" color="primary">
                Submit Inventory
           </Button>
          </div> 
          </form>
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
  onEditInventory: editInventory,
  onEditInventoryQuantityNeeded: editInventoryQuantityNeeded
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(InventoryTable));
