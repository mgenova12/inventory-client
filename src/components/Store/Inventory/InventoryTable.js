import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getInventory } from '../../../actions/getInventory.action';
import { editInventory } from '../../../actions/editInventory.action';
import { editInventoryQuantityNeeded } from '../../../actions/editInventoryQuantityNeeded.action';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import $ from 'jquery';

class InventoryTable extends React.Component {
	state = {
		quantity: [],
		loading: true
	}

	async componentDidMount() {
		let storeId = this.props.match.params.storeId
		await this.props.onRequestInventory(storeId).then(() => this.setState({loading: false}))
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
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    } 
  	const deliveryDay = this.props.match.params.deliveryDay
  	let title  = (
		  deliveryDay === 'true' ? 'Prepped' :  
		  deliveryDay === 'false' ? 'Non-Prepped' :  
		  deliveryDay
		);

		$('.form').on('keydown', 'input, select', function(e) {
		    if (e.key === "Enter") {
		        var self = $(this), form = self.parents('form:eq(0)'), focusable, next;
		        focusable = form.find('input,a,select,button,textarea').filter(':visible');
		        next = focusable.eq(focusable.index(this)+1);
		        if (next.length) {
		            next.focus();
		        } else {
		            form.submit();
		        }
		        return false;
		    }
		});

    return ( 
    	<div className='form'> 
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
				        	(invent.storeGood && invent.storeGood.product && invent.status === 'pending' &&
					        <tr key={invent.id}> 
					          <td>{invent.storeGood.product.name}</td>
					          <td>{invent.storeGood.countBy.name}</td>
					          <td>
					          {invent.storeGood.countBy.name !== '%' ? (
				            	<TextField
				                required
				                pattern="\d*"
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
           <Button size='large' type='submit' variant="contained" color="primary" >
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
