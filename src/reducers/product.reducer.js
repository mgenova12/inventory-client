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
					newState.products = payload.products.map((product)=> {
		         product.distributor = product.distributor.name
		         product.category = product.category.name
		         return product
		      })		      
		      return newState;

		case actionTypes.GET_PREPPED_PRODUCTS:
					newState.preppedProducts = payload.preppedProducts.map((preppedProduct)=> {
		         preppedProduct.category = preppedProduct.category.name
		         return preppedProduct
		      })		      
		      return newState;		      

		case actionTypes.GET_PRODUCT:
					newState.product = payload.getProduct
					return newState

		case actionTypes.EDIT_PRODUCT: 
				let editProduct = payload.editProduct.product
        editProduct.distributor = editProduct.distributor.name
        editProduct.category = editProduct.category.name
				let productIndex = newState.products.findIndex(product => product.id === editProduct.id)
				return {
					products: update(newState.products, { $splice: [[productIndex, 1, editProduct]] })
				}

		case actionTypes.EDIT_PREPPED_PRODUCT: 
				let editPreppedProduct = payload.editPreppedProduct.product
				editPreppedProduct.category = editPreppedProduct.category.name
				let preppedProductIndex = newState.preppedProducts.findIndex(product => product.id === editPreppedProduct.id)

				return {
					preppedProducts: update(newState.preppedProducts, { $splice: [[preppedProductIndex, 1, editPreppedProduct]] })
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
