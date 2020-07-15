import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getOrders } from '../../../actions/getOrders.action';
import { getStores } from '../../../actions/getStores.action';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class InvoiceTable extends React.Component {
	state = {
		total: 0,
		value: 0,
		store: null,
		isChecked: false
	}

	addSaleTotal = (event, saleTotal) => {
		if (event.target.checked){
		  this.setState({
		    total: this.state.total + parseFloat(saleTotal)
		  })		
		} else {
		  this.setState({
		    total: this.state.total - parseFloat(saleTotal)
		  })
		}
	}

	handleChange = (idx, store) => {
		this.setState({
			value: idx,
			store: store
		})
	}

	handleCheck = () => {
		this.setState({
			isChecked: !this.state.isChecked
		})
	}

	redirectToFinalInventoryOrder = (event, stortedOrder, currentStoreId, saleTotal) => {
		if(stortedOrder.saleTotal){
			this.props.history.push({
	     	pathname: `/store/2/storeOrder/${stortedOrder.id}/${currentStoreId}/InvoiceShow`,
	     	state: {total: saleTotal}
			})
		}
	}

	componentDidMount = () => {
		this.props.onRequestOrders()
		this.props.onRequestStores()
	}	

  render() {
  	console.log(this.state.store)
    return (    
	    <div> 
	    	<h3 align="center">Invoices </h3>
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
						{this.props.onGetStores.map((store, idx) => (
		          <Tab 
		          	onClick={() => this.handleChange(idx+1, store.name)} 
		          	key={store.id} 
		          	label={store.name} 
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
		        label="Paid"
		      />	


	    	<div class="mb-3 mr-3" align="right">
	    		<Button align="center" variant="contained" color="secondary"> Mark Paid </Button> 
	    	</div>
	    	<div className="table-responsive">
				  <table className="table">
				    <thead>
				      <tr>
				        <th>ID</th>
				        <th>Date</th>
				        <th>Store</th>
				        <th>Status</th>
				        <th>Total</th>
				        <th>${this.state.total}</th>
				      </tr>
				    </thead>

				    <tbody className="orderRow">
					    {
					    	this.props.onGetOrders.filter((order) => {
						    	if(this.state.store && !this.state.isChecked){
						    		return order.store.name === this.state.store && !order.paid
						    	} else if (this.state.store && this.state.isChecked) {
										return order.store.name === this.state.store && order.paid
						    	} else if (!this.state.store && !this.state.isChecked){
						    		return order.store.name
						    	} else {
						    		return order.paid
						    	}

					    }).map((stortedOrder) => {
					    	 return (
						      <tr key={stortedOrder.id} onClick={(e) => this.redirectToFinalInventoryOrder(e, stortedOrder, stortedOrder.storeId,stortedOrder.saleTotal)}>
						        <td>{stortedOrder.id}</td>
						        <td>{new Date(stortedOrder.createdAt).toLocaleString()}</td>
						        <td>{stortedOrder.store.name}</td>
						        <td>{stortedOrder.paid ? "Paid" : "Not Paid"}</td>
						        <td>{stortedOrder.saleTotal ? `$${stortedOrder.saleTotal}` : 'Pending'}</td>
						        <td>
						        {stortedOrder.saleTotal &&
								      <FormControlLabel onClick={(e) => e.stopPropagation()	}
								        control={
								          <Checkbox onChange={(e) => this.addSaleTotal(e, stortedOrder.saleTotal)} value="checkedA" />
								        }
								      />	
								    }					        	
						        </td>
						      </tr>
					      )


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
  onGetOrders: state.orderReducer.orders,
  onGetStores: state.storeReducer.stores
});

const mapActionsToProps = {
  onRequestOrders: getOrders,
  onRequestStores: getStores
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(InvoiceTable));
