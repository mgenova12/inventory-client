import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getInventoryOrder } from '../../../../actions/getInventoryOrder.action';
import { getDistributors } from '../../../../actions/getDistributors.action';
import { getContainerTypes } from '../../../../actions/getContainerTypes.action';
import { updateScanned } from '../../../../actions/updateScanned.action';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


class FinalInventoryOrder extends React.Component {
	
	state = {
		value: 0,
		distributor: null,
		isChecked: false,
		barcode: '',
		loading: true,
	}

	componentDidMount = () => {
		let storeId = this.props.match.params.currentStoreId
		let orderId = this.props.match.params.orderId
		this.props.onRequestInventoryOrder(storeId, orderId).then(() => this.setState({loading: false}))
		this.props.onRequestDistributors()
		this.props.onRequestContainerTypes()
	}	

	handleCheck = () => {
		this.setState({
			isChecked: !this.state.isChecked
		})
	}

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }   	
    return (    
   	<div> 
	    	<h3 align="center"> Store Order </h3>		
	    	<div align="center">
	    	<Button onClick={() => window.print()} variant="contained" color="primary" > Print Page </Button> 
	    	</div>
        <br/>
	    	<div className="table-responsive">
				  <table className="table table-striped">
				    <thead>
				      <tr>
				        <th>Checked</th>
				        <th>Barcode</th>
				        <th>Product</th>
				        <th>Current Quantity</th>
				        <th>Quantity Needed</th>
				      </tr>
				    </thead>
	
				    	{
						    	this.props.onGetContainerTypes.map((containerType) => {
						    		return (
							    		<tbody key={containerType.id}>
										      <tr>
										        <th className="text-center text-light bg-dark" colSpan="5">{containerType.name}</th>
										      </tr>
								    		{
								    			this.props.onGetInventoryOrder.filter((inventoryOrder) => {
											    		if(inventoryOrder.storeGood.distributor.name.toLowerCase() === 'trappe'){
											    			return inventoryOrder.scanned
											    		}
											    }).map((stortedInventoryOrder) => {

									    			if(containerType.id === stortedInventoryOrder.storeGood.containerTypeId){
													      return (
														      <tr key={stortedInventoryOrder.id} >
															      <td>
																      <FormControlLabel
																        control={
																          <Checkbox value="checkedA" />
																        }
																      />		
															      </td>
														        <td>{stortedInventoryOrder.storeGood.product.barcode.toString()}</td>
														        <td>{stortedInventoryOrder.storeGood.product.name}</td>
														        <td>{stortedInventoryOrder.quantity} {stortedInventoryOrder.storeGood.countBy.name}</td>
														        <td>{stortedInventoryOrder.quantityNeeded} {stortedInventoryOrder.storeGood.replenishBy}</td>
														      </tr>		
													      )
									    			}

									    		})
								    		}
							    		</tbody>
						    		)
						    	})
					    }

					    <tbody>
				      <tr>
				        <th className="text-center text-danger bg-dark" colSpan="5">Not Delivered!</th>
				      </tr>								    		
				      {
				      	this.props.onGetInventoryOrder.map((inventoryOrder) => {
					    		if(inventoryOrder.storeGood.distributor.name === 'Trappe' && !inventoryOrder.scanned){
					    			return (
								      <tr key={inventoryOrder.id} >
									      <td>
										      <FormControlLabel
										        control={
										          <Checkbox value="checkedA" />
										        }
										      />		
									      </td>
								        <td>{inventoryOrder.storeGood.product.barcode.toString()}</td>
								        <td>{inventoryOrder.storeGood.product.name}</td>
								        <td>{inventoryOrder.quantity} {inventoryOrder.storeGood.countBy.name}</td>
								        <td>{inventoryOrder.reasonCode}</td>
								      </tr>		
					    			)
					    		}
				      	})
				      }
				      </tbody>
				  </table>

			  </div>
		  </div>
    );
  }
}

const mapStateToProps = state => ({
  onGetInventoryOrder: state.orderReducer.inventoryOrder,
  onGetDistributors: state.distributorReducer.distributors,
  onGetContainerTypes: state.containerTypeReducer.containerTypes,
});

const mapActionsToProps = {
  onRequestInventoryOrder: getInventoryOrder,
  onRequestDistributors: getDistributors,
  onRequestContainerTypes: getContainerTypes,
  onUpdateScanned: updateScanned
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(FinalInventoryOrder));
