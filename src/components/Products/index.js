import React from "react";
import { connect } from 'react-redux'

import { getApi } from '../../actions/get-api-example.action';
import { getProducts } from '../../actions/getProducts.action';

import ProductTable from "./ProductTable";

class Products extends React.Component {
	componentWillMount = () => {
		this.props.onRequestProducts()
	}

	render(){
		const { products } = this.props.onGetProducts

		return (
		  <div className="products">
		  	{products.length > 0 && <ProductTable products={products}/> }
		  	{this.props.onGetApi}
		  </div>
			
		)
	}
}

const mapStateToProps = state => ({
  onGetApi: state.getApi.message,
  onGetProducts: state.getProducts
});

const mapActionsToProps = {
  onRequestApi: getApi,
  onRequestProducts: getProducts,
};



export default connect(mapStateToProps, mapActionsToProps)(Products);