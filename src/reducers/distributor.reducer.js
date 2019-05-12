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
				newState.distributors.push(payload.createDistributor.distributor)
				return newState
		default: 
			return state;
	}
}

