import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getOrders } from '../../../actions/getOrders.action';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class InvoiceTable extends React.Component {
	state = {
		total: 0
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

	redirectToFinalInventoryOrder = (event, orderId, currentStoreId) => {
		this.props.history.push(`/store/99/storeOrder/${orderId}/${currentStoreId}/FinalInventoryOrder`)
	}

	componentDidMount = () => {
		this.props.onRequestOrders()
	}	

  render() {
    return (    
	    <div> 
	    	<h3 align="center">Invoices </h3>
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
					    {this.props.onGetOrders.map((order) => (
					      <tr key={order.id} onClick={(e) => this.redirectToFinalInventoryOrder(e, order.id, order.storeId)}>
					        <td>{order.id}</td>
					        <td>{new Date(order.createdAt).toLocaleString()}</td>
					        <td>{order.store.name}</td>
					        <td>{order.deliveryDay ? 'Prepped' : 'Distributor'}</td>
					        <td>${order.saleTotal}</td>
					        <td>
							      <FormControlLabel onClick={(e) => e.stopPropagation()	}
							        control={
							          <Checkbox onChange={(e) => this.addSaleTotal(e, order.saleTotal)} value="checkedA" />
							        }
							      />						        	
					        </td>
					      </tr>
					    ))}				    
				    </tbody>

				  </table>
				 </div>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  onGetOrders: state.orderReducer.orders,
});

const mapActionsToProps = {
  onRequestOrders: getOrders,
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(InvoiceTable));
