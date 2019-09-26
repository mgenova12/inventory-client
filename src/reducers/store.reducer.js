import actionTypes from '../actionTypes';

const initialState = {
  stores: [],
  currentStore: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.ADD_STORE:
		      newState.stores = payload.stores;
		      return newState;
		 case actionTypes.GET_STORE: 
		      newState.currentStore = payload.getStore;
		      return newState;
		 case actionTypes.GET_STORES: 
		      newState.stores = payload.stores;
		      return newState;		      
		default: 
			return state;
	}
}
