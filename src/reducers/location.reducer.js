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
		case actionTypes.ADD_LOCATION: 
		    return { 
		      locations: (newState.locations).concat([payload.createLocation.location])
		    }	
		case actionTypes.DELETE_LOCATION: 
				let currentLocation = newState.locations.find(location => {
						return location.id === payload
				})
				return {
					locations: newState.locations.filter(location => location !== currentLocation)
				}		

		default: 
			return state;
	}
}
