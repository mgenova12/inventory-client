import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { getStoreOrders } from '../../../../actions/getStoreOrders.action';
import { getStores } from '../../../../actions/getStores.action';
import '../index.css'


class StoreOrderTable extends React.Component {

	state = {
		value: 0,
		store: null
	}

	redirectToOrder = (orderId, status, currentStoreId, event) => {
		event.stopPropagation()
		let storeId = this.props.match.params.storeId
		if(status !== 'incomplete'){
  		this.props.history.push(`/store/${storeId}/storeOrder/${orderId}/${currentStoreId}`)
		}
	}

	redirectToCompleteOrder = (storeOrderId) => {
		let storeId = this.props.match.params.storeId
		this.props.history.push(`/store/${storeId}/CombindedOrder/storeOrder/${storeOrderId}`)
	}

	handleChange = (idx, store) => {
		this.setState({
			value: idx,
			store: store
		})
	}


	componentDidMount = () => {
		let storeId = this.props.match.params.storeId
		this.props.onRequestStoreOrders()
		this.props.onRequestStores(storeId)
	}	

  render() {

    return (    
   	<div> 
	    	<h3 align="center">Store Orders </h3>

	    	<div className="table-responsive">
				  <table className="table">
				    <thead>
				      <tr>
				        <th>ID</th>
				        <th>Status</th>
				        <th>Delivery Day</th>
				      </tr>
				    </thead>

				    <tbody className="orderRow">
				    
				    {this.props.onGetStoreOrders.map((storeOrder) => (
				      <tr key={storeOrder.id} onClick={() => this.redirectToCompleteOrder(storeOrder.id)} >
				        <td>{storeOrder.id}</td>

				        <td> 
                	{storeOrder.orders.sort((a, b) => a.store.name.localeCompare(b.store.name)).map((order, index) => {
                    return <span onClick={(e) => this.redirectToOrder(order.id, order.status, order.storeId, e)} className='badge' key={ index }>{order.store.name[0]}</span>;
                  })}
				        </td>

				        <td>{new Date(storeOrder.deliveryDate).toLocaleDateString("en-US", { weekday: 'long'})} {new Date(storeOrder.deliveryDate).toLocaleDateString()}</td>
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
  onGetStoreOrders: state.orderReducer.orders,
  onGetStores: state.storeReducer.stores,
});

const mapActionsToProps = {
  onRequestStoreOrders: getStoreOrders,
  onRequestStores: getStores,
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(StoreOrderTable));

