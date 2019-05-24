import React from "react";
import { connect } from 'react-redux'
import { getProduct } from '../../../actions/getProduct.action';

class ProductShow extends React.Component {
  
  componentWillMount = () => {
    this.props.onRequestProduct(this.props.match.params.id)
  } 
 

	render() {
      const {product} = this.props.onGetProduct

	    return (
  			<div>
         {product && (
          <h4>{product.name}</h4>
         )}
  			</div>  
	    )
	}

}

const mapStateToProps = state => ({
  onGetProduct: state.productReducer,
 
});

const mapActionsToProps = {
  onRequestProduct: getProduct,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductShow);
