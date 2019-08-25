import actionTypes from '../actionTypes';

const initialState = {
  inventory: [],
  storeInventroy:[]
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_INVENTORY:
		      newState.inventory = payload.getInventory;
		      return newState;	
		case actionTypes.GET_STORE_INVENTORY:
		      newState.storeInventory = payload.getStoreInventory;
		      return newState;
		default: 
			return state;
	}
}