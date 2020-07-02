import React from "react";
import MaterialTable from 'material-table';
import { withRouter } from 'react-router-dom';
import { getStoreOrders } from '../../../../actions/getStoreOrders.action';
import { getStoreGoods } from '../../../../actions/getStoreGoods.action';
import { getCombinded } from '../../../../actions/getCombined.action';
import { connect } from 'react-redux'

class CombindedOrderTable extends React.Component {
	state = {
      columns: [
        { title: 'Product', field: 'product' },
        { title: 'Cambridge', field: 'Cambridge' },
        { title: 'Bypass', field: 'ByPass' },
        { title: 'Dover Road', field: 'Dover Road' },
        { title: 'Total', field: 'total' },
        { title: 'On Hand', field: 'onHand' },
        { title: 'Need', field: 'need' },
      ],		
			data:[]
	}

	componentDidMount = () => {    
    this.props.onRequestCombinded(this.props.match.params.storeOrderId,this.props.match.params.storeId)
	}	

  render() {
    console.log(this.props.onGetCombinded)
    return (    
	    	<div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />        
        <MaterialTable
          title="Combined List"
          columns={this.state.columns}
          data={this.props.onGetCombinded}
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
  onGetCombinded: state.orderReducer.combinded,
  onGetStoreGoods: state.storeGoodsReducer.storeGoods,
});

const mapActionsToProps = {
  onRequestStoreOrders: getStoreOrders,
  onRequestStoreGoods: getStoreGoods,
  onRequestCombinded: getCombinded,
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(CombindedOrderTable));


