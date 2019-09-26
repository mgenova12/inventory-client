import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { getStoreOrders } from '../../../../actions/getStoreOrders.action';
import { getStores } from '../../../../actions/getStores.action';
import '../index.css'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class StoreOrderTable extends React.Component {

	state = {
		value: 0,
		store: null
	}

	handleClick = (orderId, status) => {
		if(status !== 'incomplete'){
  		let storeId = this.props.match.params.storeId
  		this.props.history.push(`/store/${storeId}/order/${orderId}`)
		}
	}

	handleChange = (idx, store) => {
		this.setState({
			value: idx,
			store: store
		})
	}

	componentDidMount = () => {
		let storeId = this.props.match.params.storeId
		this.props.onRequestStoreOrders(storeId)
		this.props.onRequestStores(storeId)
	}	

  render() {
    return (    
   	<div> 
	    	<h3 align="center"> Orders </h3>
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
		          	style={{outlineStyle:'none'}} />
		        ))}
		        </Tabs>	        
		      </AppBar>

	    	<div className="table-responsive">
				  <table className="table">
				    <thead>
				      <tr>
				        <th>ID</th>
				        <th>Time Placed</th>
				        <th>Store</th>
				        <th>Delivery Day</th>
				        <th>Status</th>
				      </tr>
				    </thead>

				    <tbody className="orderRow">
				    {this.props.onGetStoreOrders.filter((order) => this.state.store ? order.store.name === this.state.store : order.store.name).map((order) => (
				      <tr key={order.id} onClick={()=> this.handleClick(order.id, order.status)} >
				        <td>{order.id}</td>
				        <td>{new Date(order.createdAt).toLocaleString()}</td>
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
  onGetStoreOrders: state.orderReducer.orders,
  onGetStores: state.storeReducer.stores,
});

const mapActionsToProps = {
  onRequestStoreOrders: getStoreOrders,
  onRequestStores: getStores,
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(StoreOrderTable));

