import actionTypes from '../actionTypes';
import update from 'immutability-helper';

const initialState = {
  products: [],
  product: ''
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_PRODUCTS:
		      newState.products = payload.products;
		      return newState;
		case actionTypes.GET_PRODUCT:
					newState.product = payload.getProduct
					return newState
		case actionTypes.EDIT_PRODUCT: 
				let productIndex = newState.products.findIndex(product => product.id === payload.editProduct.product.id)
				return {
					products: update(newState.products, { $splice: [[productIndex, 1, payload.editProduct.product]] })
				}
		case actionTypes.DELETE_PRODUCT:
				let currentProduct = newState.products.find(product => {
						return product.id === payload
				})
				return {
					products: newState.products.filter(product => product !== currentProduct)
				}		      
		default: 
			return state;
	}
}
