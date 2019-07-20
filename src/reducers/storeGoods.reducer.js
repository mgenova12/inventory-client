import actionTypes from '../actionTypes';

const initialState = {
  storeGoods: [],
  removedStoreGoods: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		 case actionTypes.GET_REMOVED_STORE_GOODS: 
		      newState.removedStoreGoods = payload.getRemovedStoreGoods;
		      return newState;
		default: 
			return state;
	}
}
