import React from "react";
import { connect } from 'react-redux'
import { getProduct } from '../../../actions/getProduct.action';

class ProductShow extends React.Component {
  
  componentWillMount = () => {
    this.props.onRequestProduct(this.props.match.params.id)
  } 
 
	render() {
      const {product} = this.props.onGetProduct
      console.log(product)
	    return (
  			<div>
         {product && (
          <div className="container"> 
            <h1 align="center"> {product.name} </h1> 
            <div align="center"> 
              {product.documents.map(img => 
                  <img key={img.id} width="150" height="150" alt="" src={`${process.env.REACT_APP_API_URL}${img.document}`}/>
              )}
            </div>
            <div> 
            <h2>Product Details</h2> 
            <hr/>
            </div>

            <ul >
              <li>Distributor: {product.distributor.name}</li>
              <li>Category: {product.category.name}</li>
              <li>Case Quantity: {product.caseQuantity}</li>
              <li>Price: {product.price}</li>
              <li>Mark Up: {product.markUp}</li>
              <li>Barcode: {product.barcode}</li>
              <li>Brand: {product.brand}</li>
              <li>Unit Size: {product.unitSize}</li>
              <li>Destributor Number: {product.distributorNumber}</li>
              <li>Description: {product.description}</li>
            </ul>            

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
