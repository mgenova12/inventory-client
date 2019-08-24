import actionTypes from '../actionTypes';

const initialState = {
  inventory: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_INVENTORY:
		      newState.inventory = payload.getInventory;
		      return newState;	
		default: 
			return state;
	}
}