import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Route, Link } from "react-router-dom";
import StoreGoods from "../StoreGoods"
import AddStoreGoods from "../AddStoreGoods"
import Locations from "../Locations"


class StoreNav extends React.Component {
	state = {
		val: 0
	}

  handleChange = (event, newValue) =>  {
  	this.setState({val: newValue})
  }
	render() {

  return (
  	<div>
	    <Paper>
	      <Tabs
        value={this.state.val}
        onChange={this.handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered	      
	      >
	        <Tab style={{textDecoration: 'inherit'}} label="Store Goods" to={`/store/${this.props.storeId}/StoreGoods`} component={Link} />
          <Tab style={{textDecoration: 'inherit'}} label="Add Store Goods" to={`/store/${this.props.storeId}/StoreGoods/Add`} component={Link} />
          <Tab style={{textDecoration: 'inherit'}} label="Locations" to={`/store/${this.props.storeId}/Locations`} component={Link} />
	      </Tabs>
	    </Paper>
      <h4> {this.props.storeName}</h4>
     <Route path={`/store/:storeId/StoreGoods`} component={StoreGoods} exact/>
     <Route path={`/store/:storeId/StoreGoods/Add`} component={AddStoreGoods} exact/>
     <Route path={`/store/:storeId/Locations`} component={Locations} exact/>

    </div>
  );
}
}

export default StoreNav;
