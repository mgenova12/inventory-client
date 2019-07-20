import React from "react";
import { connect } from 'react-redux'
import { getStore } from '../../actions/getStore.action';
import StoreNav from "./StoreNav"

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
	    	 />

		    <div className="container-fluid"> 

				</div>

				
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
