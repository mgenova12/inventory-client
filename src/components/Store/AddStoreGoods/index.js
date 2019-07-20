import React from "react";
import AddStoreGoodsTable from './AddStoreGoodsTable'


class AddStoreGoods extends React.Component {

  render() {
    return (    
	    <div> 
	    	<AddStoreGoodsTable storeId={this.props.match.params.storeId}/>			
			</div>
    );
  }
}

export default AddStoreGoods;
