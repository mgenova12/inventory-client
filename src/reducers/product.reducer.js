import actionTypes from '../actionTypes';
import update from 'immutability-helper';

const initialState = {
  products: [],
  preppedProducts: [],
  product: ''
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_PRODUCTS:
		      newState.products = payload.products;
		      return newState;
		case actionTypes.GET_PREPPED_PRODUCTS:
		      newState.preppedProducts = payload.preppedProducts;
		      return newState;		      
		case actionTypes.GET_PRODUCT:
					newState.product = payload.getProduct
					return newState
		case actionTypes.EDIT_PRODUCT: 
				let productIndex = newState.products.findIndex(product => product.id === payload.editProduct.product.id)
				return {
					products: update(newState.products, { $splice: [[productIndex, 1, payload.editProduct.product]] })
				}
		case actionTypes.EDIT_PREPPED_PRODUCT: 
				let preppedProductIndex = newState.preppedProducts.findIndex(product => product.id === payload.editPreppedProduct.product.id)
				return {
					preppedProducts: update(newState.preppedProducts, { $splice: [[preppedProductIndex, 1, payload.editPreppedProduct.product]] })
				}				
		case actionTypes.DELETE_PRODUCT:
				let currentProduct = newState.products.find(product => {
						return product.id === payload
				})
				return {
					products: newState.products.filter(product => product !== currentProduct)
				}		
		case actionTypes.DELETE_PREPPED_PRODUCT:
				let currentPreppedProduct = newState.preppedProducts.find(product => {
						return product.id === payload
				})
				return {
					preppedProducts: newState.preppedProducts.filter(product => product !== currentPreppedProduct)
				}					
		default: 
			return state;
	}
}
