import React from "react";

import { connect } from 'react-redux'
import { getApi } from '../../actions/get-api-example.action';

class Products extends React.Component {
	componentWillMount = () => {
		this.props.onRequestApi()
	}

	render(){
		return (
		  <div className="products">
		  	<h1>Products!</h1>
		  	{this.props.onGetApi}
		  </div>
			
		)
	}
}


const mapStateToProps = state => ({
  onGetApi: state.getApi.message
});

const mapActionsToProps = {
  onRequestApi: getApi,
};


export default connect(mapStateToProps, mapActionsToProps)(Products);