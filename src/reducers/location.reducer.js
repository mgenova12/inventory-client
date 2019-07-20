import actionTypes from '../actionTypes';

const initialState = {
  locations: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_LOCATIONS:
		      newState.locations = payload.locations;
		      return newState;
		case actionTypes.UPDATE_LOCATION_ROW_ORDER:
		      newState.locations = payload.updateLocationRowOrder.locations;
		      return newState;
		default: 
			return state;
	}
}
