import actionTypes from '../actionTypes';

const initialState = {
  storeTypes: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_STORE_TYPES:
		      newState.storeTypes = payload.storeTypes;
		      return newState;
		default: 
			return state;
	}
}
