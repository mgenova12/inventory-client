import actionTypes from '../actionTypes';

const initialState = {
  message: "initial"
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_API:
		      newState.message = payload.message;
		      return newState;
		default: 
			return state;
	}
}
