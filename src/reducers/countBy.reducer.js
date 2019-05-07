import actionTypes from '../actionTypes';

const initialState = {
  countBies: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_COUNT_BIES:
		      newState.countBies = payload.countBies;
		      return newState;
		default: 
			return state;
	}
}

