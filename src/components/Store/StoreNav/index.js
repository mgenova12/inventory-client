import React from 'react';
import { Route } from "react-router-dom";
import StoreGoods from "../StoreGoods"
import AddStoreGoods from "../AddStoreGoods"
import Locations from "../Locations"  
import DeliveryDay from "../Inventory"
import Orders from "../Orders"
import InventoryTable from "../Inventory/InventoryTable"

class StoreNav extends React.Component {

	render() {
    console.log(this.props.storeType)
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
                <a className="nav-link" href={`/store/${this.props.storeId}/DeliveryDay`}>Inventory</a>
              </li>  
              {this.props.storeType === 'Prepcenter' &&
                <li className="nav-item">
                  <a className="nav-link" href={`/store/${this.props.storeId}/Orders`}>Orders</a>
                </li>
              }
            </ul>
          </div>
        </nav>  
         <Route path={`/store/:storeId/StoreGoods`} component={StoreGoods} exact/>
         <Route path={`/store/:storeId/StoreGoods/Add`} component={AddStoreGoods} exact/>
         <Route path={`/store/:storeId/Locations`} component={Locations} exact/>
         <Route path={`/store/:storeId/Orders`} component={Orders} exact/>
         <Route path={`/store/:storeId/DeliveryDay`} component={DeliveryDay} exact/>
         <Route path={`/store/:storeId/Inventory/:deliveryDay`} component={InventoryTable}/>
      </div>




  );
}
}

export default StoreNav;
