import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getInventoryOrder } from '../../../../actions/getInventoryOrder.action';
import { updateReasonCode } from '../../../../actions/updateReasonCode.action';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class StoreOrderReasonCodes extends React.Component {

	state = {
		reasonCode:''
	}

	componentDidMount = () => {
		let storeId = this.props.match.params.currentStoreId
		let orderId = this.props.match.params.orderId
		this.props.onRequestInventoryOrder(storeId, orderId)
	}	
 	
  handleChange = (id) => event => {
  	this.props.onUpdateReasonCode(id, event.target.value)
  };	

	redirectToFinalInventoryOrder = () => {
		let currentStoreId = this.props.match.params.currentStoreId
		let orderId = this.props.match.params.orderId	
		let storeId = this.props.match.params.storeId	
		this.props.history.push(`/store/${storeId}/storeOrder/${orderId}/${currentStoreId}/FinalInventoryOrder`)
	}

  render() {

	    return (    
	    <div>
	    <h3 align="center"> Reason Codes </h3>	
	    	<div align="center">
	    		<Button onClick={() => this.redirectToFinalInventoryOrder()} variant="contained" color="primary" > Next > </Button> 
	    	</div>
	    	<div className="table-responsive">
				  <table className="table">
				    <thead>
				      <tr>
				        <th>ID</th>
				        <th>Product</th>
				        <th>Reason Code</th>
				      </tr>
				    </thead>

				    <tbody>
					    {this.props.onGetInventoryOrder.map((inventoryOrder) => {
					    	if(!inventoryOrder.scanned && inventoryOrder.storeGood.distributor.name === 'Trappe'){
					    		return (
							      <tr key={inventoryOrder.id}  >
							        <td>{inventoryOrder.id}</td>

							        <td>{inventoryOrder.storeGood.product.name} </td>

							        <td> 
									    	<TextField
									    			select
									          label="Reason Code"
									          name="reasonCode"
									          placeholder="Select a Reason Code"
									          fullWidth
									          onChange={this.handleChange(inventoryOrder.id)}
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

									        {
														!inventoryOrder.reasonCode ?
															<React.Fragment>
												        <option key='' value=''></option>
												        <option key='reason1' value='Out of Stock'>Out of Stock</option>
												        <option key='reason2' value='Not Ready'>Not Ready</option>
												        <option key='reason3' value='Waiting on Delivery'>Waiting on Delivery</option>
											       	</React.Fragment>
											       	:
												        <option key={inventoryOrder.reasonCode} value={inventoryOrder.reasonCode}>{inventoryOrder.reasonCode}</option>
									        }



									        </TextField>	
							        </td>
							      </tr>
					    		)}
					    	
					    })}
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
  onUpdateReasonCode: updateReasonCode
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(StoreOrderReasonCodes));
