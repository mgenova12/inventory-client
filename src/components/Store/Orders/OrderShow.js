import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getInventoryOrder } from '../../../actions/getInventoryOrder.action';
import { getDistributors } from '../../../actions/getDistributors.action';
import { getCategories } from '../../../actions/getCategories.action';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


class OrderShow extends React.Component {
	
	state = {
		value: 0,
		distributor: null,
		isChecked: false
	}

	componentDidMount = () => {
		let storeId = this.props.match.params.storeId
		let orderId = this.props.match.params.orderId
		this.props.onRequestInventoryOrder(storeId, orderId)
		this.props.onRequestDistributors()
		this.props.onRequestCategories()
	}	

	handleChange = (idx, distributor) => {
		this.setState({
			value: idx,
			distributor: distributor
		})
	}

	handleCheck = () => {
		this.setState({
			isChecked: !this.state.isChecked
		})
	}

  render() {
    return (    
   	<div> 
	    	<h3 align="center"> Final Order </h3>	
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
		          	onClick={() => this.handleChange(0, null)} 
		          	label='All' 
		          	style={{outlineStyle:'none'}} />
		        ))}	
			        <Tab 
			        	label={'Jetro Aisles'}
			        	onClick={() => this.handleChange(1, 'Jetroo')}
			        	style={{outlineStyle:'none'}}
			        />	        
						{this.props.onGetDistributors.map((distributor, idx) => (
		          <Tab 
		          	onClick={() => this.handleChange(idx+2, distributor.name)} 
		          	key={distributor.id} 
		          	label={distributor.name} 
		          	style={{outlineStyle:'none'}} 
		          />
		        ))}
		        </Tabs>	        
		      </AppBar>
		      &nbsp;
		      &nbsp;
		      <FormControlLabel
		        control={
		          <Checkbox checked={this.state.isChecked} onChange={() => this.handleCheck()} value="checkedA" />
		        }
		        label="Remove Zeros"
		      />			      

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

							this.state.distributor === 'Jetroo' ? (
								Array.from(Array(20), (e, i) => {
					    		return (
						    		<tbody key={i}>
									      <tr>
									        <th className="text-center text-light bg-dark" colSpan="4">{i}</th>
									      </tr>
							    		{
							    			this.props.onGetInventoryOrder.filter((inventoryOrder) => {
												    if(this.state.distributor && !this.state.isChecked){
											    		return this.state.distributor === 'Jetroo'
											    	} else if (this.state.distributor && this.state.isChecked) {
															return this.state.distributor === 'Jetroo' && inventoryOrder.quantityNeeded !== 0 
											    	} else if (!this.state.distributor && !this.state.isChecked){
											    		return inventoryOrder.storeGood.distributor.name
											    	} else {
											    		return inventoryOrder.quantityNeeded !== 0
											    	}

											    }).map((stortedInventoryOrder) => {
								    			if(i === stortedInventoryOrder.storeGood.product.aisleNumber){
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

								) : (
						    	this.props.onGetCategories.map((category) => {
						    		return (
							    		<tbody key={category.id}>
										      <tr>
										        <th className="text-center text-light bg-dark" colSpan="4">{category.name}</th>
										      </tr>
								    		{
								    			this.props.onGetInventoryOrder.filter((inventoryOrder) => {
											    	if(this.state.distributor && !this.state.isChecked){
											    		return inventoryOrder.storeGood.distributor.name === this.state.distributor
											    	} else if (this.state.distributor && this.state.isChecked) {
															return inventoryOrder.storeGood.distributor.name === this.state.distributor && inventoryOrder.quantityNeeded !== 0 
											    	} else if (!this.state.distributor && !this.state.isChecked){
											    		return inventoryOrder.storeGood.distributor.name
											    	} else {
											    		return inventoryOrder.quantityNeeded !== 0
											    	}

											    }).map((stortedInventoryOrder) => {

									    			if(category.name === stortedInventoryOrder.storeGood.product.category.name){
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

								)



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
  onGetCategories: state.categoryReducer.categories,
});

const mapActionsToProps = {
  onRequestInventoryOrder: getInventoryOrder,
  onRequestDistributors: getDistributors,
  onRequestCategories: getCategories,
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(OrderShow));
