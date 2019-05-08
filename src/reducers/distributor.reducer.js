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
		default: 
			return state;
	}
}
