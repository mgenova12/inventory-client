import React from "react";
import StoreGoodsTable from './StoreGoodsTable'


class StoreGoods extends React.Component {

  render() {
    return (    
	    <div> 
	    	<StoreGoodsTable storeId={this.props.match.params.storeId}/>	
			</div>
    );
  }
}

export default StoreGoods;
