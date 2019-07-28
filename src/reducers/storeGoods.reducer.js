import actionTypes from '../actionTypes';

const initialState = {
  storeGoods: [],
  removedStoreGoods: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		 case actionTypes.ADD_STORE_GOOD:
				let currentRemovedStoreGood = newState.removedStoreGoods.find(removedStoreGood => {
						return removedStoreGood.id === payload.createStoreGood.storeGood.product.id
				})
				// newState.storeGoods.concat(currentRemovedStoreGood)
				return {
					removedStoreGoods: newState.removedStoreGoods.filter(removedStoreGood => removedStoreGood !== currentRemovedStoreGood)
				}		  
		 case actionTypes.GET_STORE_GOODS:
		      newState.storeGoods = payload.getStoreGoods;
		      return newState;		 		
		 case actionTypes.GET_REMOVED_STORE_GOODS: 
		      newState.removedStoreGoods = payload.getRemovedStoreGoods;
		      return newState;
		default: 
			return state;
	}
}
