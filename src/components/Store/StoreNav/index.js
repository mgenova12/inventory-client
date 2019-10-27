import React from 'react';
import { Route } from "react-router-dom";
import StoreGoods from "../StoreGoods"
import AddStoreGoods from "../AddStoreGoods"
import Locations from "../Locations"  
import DeliveryDay from "../Inventory"
import Orders from "../Orders"
import AddToInventory from "../AddToInventory"
import StoreOrders from "../Orders/StoreOrders"
import InventoryTable from "../Inventory/InventoryTable"
import InventorySuccess from "../Inventory/InventorySuccess"
import OrderShow from "../Orders/OrderShow"

class StoreNav extends React.Component {

	render() {
    return (

      <div> 
        <nav className="navbar navbar-expand-lg navbar-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/">Rusticana-{this.props.storeName}</a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <a className="nav-link" href={`/store/${this.props.storeId}/StoreGoods`}>Store Goods</a>
              </li>        
              <li className="nav-item">
                <a className="nav-link" href={`/store/${this.props.storeId}/StoreGoods/Add`}>Add Store Goods</a>
              </li>     
              <li className="nav-item">
                <a className="nav-link" href={`/store/${this.props.storeId}/Locations`}>Locations</a>
              </li>  
              <li className="nav-item">
                <a className="nav-link" href={`/store/${this.props.storeId}/${this.props.storeType}/DeliveryDay`}>Inventory</a>
              </li>  
              <li className="nav-item">
                <a className="nav-link" href={`/store/${this.props.storeId}/storeType/${this.props.storeType}/Orders`}>Orders</a>
              </li>
              {this.props.storeType === 'Prepcenter' &&
              <React.Fragment>
                <li className="nav-item">
                  <a className="nav-link" href={`/store/${this.props.storeId}/storeType/${this.props.storeType}/StoreOrders`}>Store Orders</a>
                </li>  
                <li className="nav-item">
                  <a className="nav-link" href={`/store/${this.props.storeId}/storeType/${this.props.storeType}/AddToInventory`}>Adjust Inventory</a>
                </li>                 
              </React.Fragment>
              }
            </ul>
          </div>
        </nav>  
         <Route path={`/store/:storeId/StoreGoods`} component={StoreGoods} exact/>
         <Route path={`/store/:storeId/StoreGoods/Add`} component={AddStoreGoods} exact/>
         <Route path={`/store/:storeId/Locations`} component={Locations} exact/>
         <Route path={`/store/:storeId/:storeType/:storeType/Orders`} component={Orders} exact/>
         <Route path={`/store/:storeId/:storeType/:storeType/StoreOrders`} component={StoreOrders} exact/>
         <Route path={`/store/:storeId/:storeType/:storeType/AddToInventory`} component={AddToInventory} exact/>
         <Route path={`/store/:storeId/:storeType/DeliveryDay`} component={DeliveryDay} exact/>
         <Route path={`/store/:storeId/Success`} component={InventorySuccess}/>
         <Route path={`/store/:storeId/Inventory/:deliveryDay`} component={InventoryTable}/>
         <Route path={`/store/:storeId/order/:orderId`} component={OrderShow}/>

      </div>


    );
  }
}

export default StoreNav;
