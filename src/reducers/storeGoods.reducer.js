import actionTypes from '../actionTypes';
import update from 'immutability-helper';

const initialState = {
  storeGoods: [],
  removedStoreGoods: [],
  storeGood: ''
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		 case actionTypes.ADD_STORE_GOOD:
				let currentRemovedStoreGood = newState.removedStoreGoods.find(removedStoreGood => {
						return removedStoreGood.id === payload.createStoreGood.storeGood.product.id
				})
				return {
					removedStoreGoods: newState.removedStoreGoods.filter(removedStoreGood => parseInt(removedStoreGood.id) !== parseInt(currentRemovedStoreGood.id))
				}
			case actionTypes.EDIT_STORE_GOOD:
				let storeGoodIndex = newState.storeGoods.findIndex(storeGood => storeGood.id === payload.editStoreGood.storeGood.id)
				return {
					storeGoods: update(newState.storeGoods, { $splice: [[storeGoodIndex, 1, payload.editStoreGood.storeGood]] })
				}					
			case actionTypes.UPDATE_AMOUNT_IN_STOCK:
				let storeGoodIdx = newState.storeGoods.findIndex(storeGood => storeGood.id === payload.updateAmountInStock.storeGood.id)
				return {
					storeGoods: update(newState.storeGoods, { $splice: [[storeGoodIdx, 1, payload.updateAmountInStock.storeGood]] })
				}		
			case actionTypes.DELETE_STORE_GOOD:
				let currentStoreGood = newState.storeGoods.find(storeGood => {
						return storeGood.id === payload
				})
				return {
					storeGoods: newState.storeGoods.filter(storeGood => storeGood !== currentStoreGood)
				}					
		 	case actionTypes.GET_STORE_GOODS:
		     	newState.storeGoods = payload.getStoreGoods;
		    return newState;		 		
		 	case actionTypes.GET_REMOVED_STORE_GOODS:
		      newState.removedStoreGoods = payload.getRemovedStoreGoods;
		    return newState;
		  case actionTypes.GET_STORE_GOOD:
					newState.storeGood = payload.getStoreGood
					return newState		  	
			default: 
				return state;
	}
}
