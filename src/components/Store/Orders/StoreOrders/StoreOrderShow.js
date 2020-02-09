import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getInventoryOrder } from '../../../../actions/getInventoryOrder.action';
import { getDistributors } from '../../../../actions/getDistributors.action';
import { getContainerTypes } from '../../../../actions/getContainerTypes.action';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class StoreOrderShow extends React.Component {
	
	state = {
		value: 0,
		distributor: null,
		isChecked: false
	}

	componentDidMount = () => {
		let storeId = this.props.match.params.currentStoreId
		let orderId = this.props.match.params.orderId
		this.props.onRequestInventoryOrder(storeId, orderId)
		this.props.onRequestDistributors()
		this.props.onRequestContainerTypes()
	}	

	handleCheck = () => {
		this.setState({
			isChecked: !this.state.isChecked
		})
	}

  render() {
    return (    
   	<div> 
	    	<h3 align="center"> Store Order </h3>		
					<form onSubmit={this.handleSubmit}>
			    	<TextField
			          label="Search Product by barcode"
			          required
			          // value={this.state.name}
			          name="name"
			          placeholder="Search Product by barcode"
			          fullWidth
			          onChange={this.handleChange}
			          margin="normal"
			          variant="outlined"
			          InputLabelProps={{
			            shrink: true,
			          }}
			        />	
		        </form>	    		   
		      <AppBar position="static" color="default">
		        <Tabs
		          value={this.state.value}
		          indicatorColor="primary"
		          textColor="primary"
		          variant="scrollable"
		          scrollButtons="auto"
		          aria-label="scrollable auto tabs example"
		        >
		          <Tab 
		          	// onClick={() => this.handleChange(0, null)} 
		          	label='UnScanned' 
		          	style={{outlineStyle:'none'}} />
		        ))}	
			        <Tab 
			        	label={'Scanned'}
			        	// onClick={() => this.handleChange(1, 'Jetroo')}
			        	style={{outlineStyle:'none'}}
			        />	        
		        </Tabs>	        
		      </AppBar>		           
	    	<div className="table-responsive">
				  <table className="table table-striped">
				    <thead>
				      <tr>
				        <th>Checked</th>
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
										        <th className="text-center text-light bg-dark" colSpan="4">{containerType.name}</th>
										      </tr>
								    		{
								    			this.props.onGetInventoryOrder.filter((inventoryOrder) => {
											    		return inventoryOrder.storeGood.distributor.name === 'Trappe'
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
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(StoreOrderShow));
