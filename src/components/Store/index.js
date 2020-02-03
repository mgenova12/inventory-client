import React from "react";
import { connect } from 'react-redux'
import { getStore } from '../../actions/getStore.action';
import StoreNav from "./StoreNav"

import { Route } from "react-router-dom";
import StoreGoods from "./StoreGoods"
import AddStoreGoods from "./AddStoreGoods"
import Locations from "./Locations"  
import DeliveryDay from "./Inventory"
import Orders from "./Orders"
import AddToInventory from "./AddToInventory"
import PrintLabels from "./PrintLabels"
import PrintLabelsShow from "./PrintLabels/PrintLabelsShow"
import StoreOrders from "./Orders/StoreOrders"
import InventoryTable from "./Inventory/InventoryTable"
import InventorySuccess from "./Inventory/InventorySuccess"
import OrderShow from "./Orders/OrderShow"
import CombindedOrderTable from "./Orders/StoreOrders/CombindedOrderTable"
import StoreOrderShow from "./Orders/StoreOrders/StoreOrderShow"

class Store extends React.Component {

	componentDidMount = () => {
		this.props.onRequestCurrentStore(this.props.match.params.storeId)
	}

  render() {
    return (    
    	<div>
	    	<StoreNav 
	    		storeId={this.props.match.params.storeId}
	    		storeName={this.props.onGetStore.name}
	    		storeType={this.props.onGetStore.storeType ? this.props.onGetStore.storeType.name : ''}
	    	 />			

         <Route path={`/store/:storeId/StoreGoods`} component={StoreGoods} exact/>
         <Route path={`/store/:storeId/StoreGoods/Add`} component={AddStoreGoods} exact/>
         <Route path={`/store/:storeId/Locations`} component={Locations} exact/>
         
         <Route path={`/store/:storeId/storeType/:storeType/Orders`} component={Orders} exact/>
         <Route path={`/store/:storeId/storeType/:storeType/StoreOrders`} component={StoreOrders} exact/>
         <Route path={`/store/:storeId/storeType/:storeType/AddToInventory`} component={AddToInventory} exact/>
         <Route path={`/store/:storeId/storeType/:storeType/PrintLabels`} component={PrintLabels} exact/>
         
         <Route path={`/store/:storeId/:storeType/DeliveryDay`} component={DeliveryDay} exact/>
         <Route path={`/store/:storeId/Success`} component={InventorySuccess}/>
         <Route path={`/store/:storeId/Inventory/:deliveryDay`} component={InventoryTable}/>
         <Route path={`/store/:storeId/order/:orderId`} component={OrderShow}/>
        
         <Route path={`/store/:storeId/storeType/:storeType/PrintLabels/:productId`} component={PrintLabelsShow}/>
         <Route path={`/store/:storeId/CombindedOrder/storeOrder/:storeOrderId`} component={CombindedOrderTable} exact/>
         
         <Route path={`/store/:storeId/storeOrder/:orderId/:currentStoreId`} component={StoreOrderShow} exact/>

			</div>

    );
  }
}

const mapStateToProps = state => ({
  onGetStore: state.storeReducer.currentStore,
});

const mapActionsToProps = {
  onRequestCurrentStore: getStore,
};


export default connect(mapStateToProps, mapActionsToProps)(Store);
