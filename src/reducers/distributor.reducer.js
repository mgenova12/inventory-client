import actionTypes from '../actionTypes';

const initialState = {
  distributors: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_DISTRIBUTORS:
	      newState.distributors = payload.distributors;
	      return newState;
		case actionTypes.ADD_DISTRIBUTOR:
		    return { 
		        distributors: [payload.createDistributor.distributor].concat(newState.distributors)
		    }	
		case actionTypes.DELETE_DISTRIBUTOR:
				let currentDistributor = newState.distributors.find(distributor => {
						return distributor.id === payload
				})
				return {
					distributors: newState.distributors.filter(distributor => distributor !== currentDistributor)
				}

		default: 
			return state;
	}
}

