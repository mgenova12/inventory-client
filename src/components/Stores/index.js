import React from "react";
import { connect } from 'react-redux'
import { getStoreTypes } from '../../actions/getStoreTypes.action';

class Stores extends React.Component {
	
	componentWillMount = () => {
		this.props.onRequestStoreTypes()
	}

  render() {
  	const displayStores = this.props.onGetStoreTypes.map(storeType => {
			return (
				<div key={storeType.id} className="list-group">
					<h4>{storeType.name}</h4> 
					{storeType.stores.map(store => 
						<a key={store.id} href="/" className="list-group-item list-group-item-action list-group-item-light">{store.name}</a>
					)}
				</div>
			)

		})

    return (    
    	<div>
    		{displayStores}
    	</div>
    );
  }
}

const mapActionsToProps = {
  onRequestStoreTypes: getStoreTypes,
};

const mapStateToProps = state => ({
  onGetStoreTypes: state.storeTypesReducer.storeTypes
});

export default connect(mapStateToProps, mapActionsToProps)(Stores)