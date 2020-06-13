import React from "react";
import MaterialTable from 'material-table';
import { withRouter } from 'react-router-dom';
import { getStoreOrders } from '../../../../actions/getStoreOrders.action';
import { getStoreGoods } from '../../../../actions/getStoreGoods.action';
import { connect } from 'react-redux'

class CombindedOrderTable extends React.Component {
	state = {
      columns: [
        { title: 'Product', field: 'product' },
        { title: 'Cambridge', field: 'Cambridge' },
        { title: 'Bypass', field: 'Bypass' },
        { title: 'Dover Road', field: 'Dover Road' },
        { title: 'Total', field: 'total' },
        { title: 'On Hand', field: 'onHand' },
        { title: 'Need', field: 'Need' },
      ],		
			data:[]
	}


getRows = () => {
  	let storeOrders = this.props.onGetStoreOrders[0]
  	if (storeOrders) {
  		let orders = storeOrders.orders
  		if (orders){
	  		orders.forEach((order) => {
		  			order.inventories.forEach((inventory) => {
							const data = [...this.state.data]
							if(this.state.data.find(p => p.product === inventory.storeGood.product.name)){
								let finder = data.find(p => p.product === inventory.storeGood.product.name)
								finder[inventory.store.name] = inventory.quantityNeeded
								finder['total'] = finder['total'] + inventory.quantityNeeded
							} else {
								data.push({product: inventory.storeGood.product.name, [inventory.store.name]:inventory.quantityNeeded, total: inventory.quantityNeeded, onHand: null});
							}
							this.setState({ ...this.state, data });
						})

	  		})
  		}
  	}
}

getAmountInStock = () => {
		this.props.onGetStoreGoods.forEach(storeGood => {
			const data = [...this.state.data]
			if(this.state.data.find(p => p.product === storeGood.product)){
				let finder = data.find(p => p.product === storeGood.product)
				finder['onHand'] = storeGood.amountInStock
				finder['Need'] = finder['total'] - finder['onHand']
			}
			this.setState({ ...this.state, data });
		})	
}

	componentDidMount = () => {
		this.props.onRequestStoreOrders().then(() => this.getRows())
		this.props.onRequestStoreGoods(this.props.match.params.storeId).then(() => this.getAmountInStock())
	}	

  render() {

    return (    
	    	<div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />        
        <MaterialTable
          title="Combined List"
          columns={this.state.columns}
          data={this.state.data}
          options={{
            paging: false,
            actionsColumnIndex: -1,
          }}       
        />
				</div>
    );
  }
}

const mapStateToProps = state => ({
  onGetStoreOrders: state.orderReducer.orders,
  onGetStoreGoods: state.storeGoodsReducer.storeGoods,
});

const mapActionsToProps = {
  onRequestStoreOrders: getStoreOrders,
  onRequestStoreGoods: getStoreGoods,
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(CombindedOrderTable));


