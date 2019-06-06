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
          <div> 
            <h2> {product.name} </h2> 
            {
              product.documents.map(img => 
                <img key={img.id} width="200" height="200" alt="" src={`${process.env.REACT_APP_API_URL}${img.document}`}/>
              )
            }
          </div>
         )}
  			</div>  
	    )
	}

}

const mapStateToProps = state => ({
  onGetProduct: state.productReducer
 
});

const mapActionsToProps = {
  onRequestProduct: getProduct
};

export default connect(mapStateToProps, mapActionsToProps)(ProductShow);
