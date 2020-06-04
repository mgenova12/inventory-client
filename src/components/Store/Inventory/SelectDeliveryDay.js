import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { getStoreInventory } from '../../../actions/getStoreInventory.action';
import { deleteInventory } from '../../../actions/deleteInventory.action';
import { addInventory } from '../../../actions/addInventory.action';


class SelectDeliveryDay extends React.Component {

	state = {
		deliveryDay: '',
		deliveryDaySelected: false,
		inventoryCount: null,
		loading: false
	}

 handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      deliveryDaySelected: true
    });
  };

  cancelInventory = () => {
  	if (window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS INVENTORY?")) {
  		this.props.onDeleteInventory(this.props.match.params.storeId).then(() => window.location.reload())
  	}
  }

  createRedirect = () => {	
    let storeId = this.props.match.params.storeId
    this.setState({loading: true})
  	this.props.onAddInventory(storeId, this.state.deliveryDay).then(() => this.props.history.push(`/store/${storeId}/Inventory/${this.state.deliveryDay}`)).then(() => this.setState({loading: false}))
  }

	componentDidMount = () => {
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
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }  	
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
		      	{this.props.match.params.storeType === 'Prepcenter' ? (
		      		<React.Fragment>
		      			<option key='' value=''></option>
		      			<option key='Prepped' value='true'>Prepped Inventory</option>
		      			<option key='Distributor' value='false'>Distributor Inventory</option>
		      		</React.Fragment>
		      		) : (
		      		<React.Fragment>
		      			<option key='' value=''></option>
		      			<option key='Tuesday' value='Tuesday'>Tuesday</option>
		      			<option key='Friday' value='Friday'>Friday</option>
		      		</React.Fragment>
		      	)}

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
           <div className="buttons"> 
           <a href={`/store/${this.props.match.params.storeId}/Inventory/${this.state.deliveryDay}`}>
	           	<Button className="button" type='submit' variant="contained" color="primary" size="large" onClick={this.redirect}>
	                Go To Inventory
           	</Button>
 						</a>
	         <Button className="button" type='submit' variant="contained" color="secondary" size="large" onClick={this.cancelInventory}>
	              Cancel Inventory
	         </Button> 
	         </div>
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
  onAddInventory: addInventory,
  onDeleteInventory: deleteInventory
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(SelectDeliveryDay));

