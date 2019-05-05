import React from "react";
import { connect } from 'react-redux'

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
		  </div>
			
		)
	}
}

const mapStateToProps = state => ({
  onGetProducts: state.productReducer
});

const mapActionsToProps = {
  onRequestProducts: getProducts,
};


export default connect(mapStateToProps, mapActionsToProps)(Products);