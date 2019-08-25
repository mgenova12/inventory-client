import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { getStoreInventory } from '../../../actions/getStoreInventory.action';
import { addInventory } from '../../../actions/addInventory.action';


class SelectDeliveryDay extends React.Component {

	state = {
		deliveryDay: '',
		deliveryDaySelected: false,
		inventoryCount: null
	}

 handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      deliveryDaySelected: true
    });
  };

  createRedirect = () => {	
    let storeId = this.props.match.params.storeId
  	this.props.onAddInventory(storeId, this.state.deliveryDay).then(() => this.props.history.push(`/store/${storeId}/Inventory/${this.state.deliveryDay}`)) 	
  }

  redirect = () => {
  	let storeId = this.props.match.params.storeId
  	this.props.history.push(`/store/${storeId}/Inventory/${this.state.deliveryDay}`)
  }


	componentWillMount = () => {
		let storeId = this.props.match.params.storeId
		this.props.onRequestStoreInventory(storeId).then(() => {
			if(this.props.onGetStoreInventory){
				this.setState({
					inventoryCount: this.props.onGetStoreInventory.inventories.length,
					deliveryDay: this.props.onGetStoreInventory.deliveryDay
				})
			}
		})
	}	  
		
  render() {
		if (this.props.onGetStoreInventory === undefined) { return null }
    return ( 
    <div>   
    	{ this.state.inventoryCount <= 0 ? (
		    <div className="center-screen"> 
		    	<h1> Select Delivery Day </h1>
	        <TextField
		        select
		        label="Delivery Day"
		        name="deliveryDay"
		        value={this.state.deliveryDay}
		        fullWidth
		        margin="normal"
		        onChange={this.handleChange('deliveryDay')}
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
		      	<option key='Tuesday' value='Tuesday'>Tuesday</option>
		      	<option key='Friday' value='Friday'>Friday</option>
	        </TextField> 
	        
	        {this.state.deliveryDaySelected &&
	        	<Grow in={true}>
		        	<div>
			           <Button type='submit' variant="contained" color="primary" size="large" onClick={this.createRedirect}>
			                Start Inventory
			           </Button>
		           </div>
           	</Grow>
	        }
				</div>
      ) : (
      	<div className="center-screen"> 
      		<h1> An Inventory Has Already Been Started! </h1>
		           <Button type='submit' variant="contained" color="primary" size="large" onClick={this.redirect}>
		                Go To Inventory
		           </Button>      		 
      	</div>
      )}
     </div>
    );
  }
}

const mapStateToProps = state => ({
  onGetStoreInventory: state.inventoryReducer.storeInventory,
});

const mapActionsToProps = {
  onRequestStoreInventory: getStoreInventory,
  onAddInventory: addInventory
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(SelectDeliveryDay));

