import React from "react";
import { connect } from 'react-redux'
import { getStore } from '../../actions/getStore.action';
import StoreNav from "./StoreNav"

import { Route } from "react-router-dom";
import StoreGoods from "./StoreGoods"
import AddStoreGoods from "./AddStoreGoods"
import Locations from "./Locations"  
import DeliveryDay from "./Inventory"
import OrderTable from "./Orders/OrderTable"
import AddToInventory from "./AddToInventory"
import PrintLabels from "./PrintLabels"
import PrintLabelsShow from "./PrintLabels/PrintLabelsShow"
import InventoryTable from "./Inventory/InventoryTable"
import InventorySuccess from "./Inventory/InventorySuccess"
import OrderShow from "./Orders/OrderShow"
import CombindedOrderTable from "./Orders/StoreOrders/CombindedOrderTable"
import StoreOrderShow from "./Orders/StoreOrders/StoreOrderShow"
import StoreOrderTable from "./Orders/StoreOrders/StoreOrderTable"
import StoreOrderReasonCodes from "./Orders/StoreOrders/StoreOrderReasonCodes"
import FinalInventoryOrder from "./Orders/StoreOrders/FinalInventoryOrder"

import InvoiceShow from "../Globals/Invoices/InvoiceShow"

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
         
         <Route path={`/store/:storeId/storeType/:storeType/Orders`} component={OrderTable} exact/>
         <Route path={`/store/:storeId/order/:orderId`} component={OrderShow} exact/>
         
         <Route path={`/store/:storeId/storeType/:storeType/StoreOrders`} component={StoreOrderTable} exact/>
         <Route path={`/store/:storeId/order/:orderId/currentStore/:currentStoreId/storeOrder/:storeOrderId`} component={StoreOrderShow} exact/>
         <Route path={`/store/:storeId/order/:orderId/currentStore/:currentStoreId/storeOrder/:storeOrderId/ReasonCodes`} component={StoreOrderReasonCodes} exact/>

         <Route path={`/store/:storeId/storeOrder/:orderId/:currentStoreId/FinalInventoryOrder`} component={FinalInventoryOrder} exact/>
         <Route path={`/store/:storeId/storeOrder/:orderId/:currentStoreId/InvoiceShow`} component={InvoiceShow} exact/>

         <Route path={`/store/:storeId/storeType/:storeType/AddToInventory`} component={AddToInventory} exact/>
         <Route path={`/store/:storeId/storeType/:storeType/PrintLabels`} component={PrintLabels} exact/>
         
         <Route path={`/store/:storeId/:storeType/DeliveryDay`} component={DeliveryDay} exact/>
         <Route path={`/store/:storeId/Success`} component={InventorySuccess} exact/>
         <Route path={`/store/:storeId/Inventory/:deliveryDay`} component={InventoryTable} exact/>
        
         <Route path={`/store/:storeId/CombindedOrder/storeOrder/:storeOrderId`} component={CombindedOrderTable} exact/>
         <Route path={`/store/:storeId/storeType/:storeType/PrintLabels/:productId`} component={PrintLabelsShow} exact/>
         
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
