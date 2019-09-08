import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { getOrders } from '../../../actions/getOrders.action';


class OrderTable extends React.Component {

	handleClick = (orderId, status) => {
		if(status !== 'incomplete'){
  		let storeId = this.props.match.params.storeId
  		this.props.history.push(`/store/${storeId}/order/${orderId}`)
		}
	}

	componentDidMount = () => {
		let storeId = this.props.match.params.storeId
		this.props.onRequestOrders(storeId)
	}	

  render() {
    return (    
   	<div> 
	    	<h3 align="center"> Orders </h3>
	    	<div className="table-responsive">
				  <table className="table table-striped">
				    <thead>
				      <tr>
				        <th>ID</th>
				        <th>Time Placed</th>
				        <th>Store</th>
				        <th>Delivery Day</th>
				        <th>Status</th>
				      </tr>
				    </thead>
	
				    <tbody>
				    {this.props.onGetOrders.map((order) => (
				      <tr key={order.id} onClick={()=> this.handleClick(order.id, order.status)} >
				        <td>{order.id}</td>
				        <td>{order.createdAt}</td>
				        <td>{order.store.name}</td>
				        <td>{order.deliveryDay}</td>
				        <td style={{ color: order.status === "incomplete" ? "red" : order.status === "pending" ? "orange" : "green" }}>
				        	{order.status}
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

export default connect(mapStateToProps, mapActionsToProps)(withRouter(OrderTable));

