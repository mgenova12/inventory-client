import actionTypes from '../actionTypes';

const initialState = {
  errors: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.FORM_ERRORS:
		      newState.errors = payload.errors;
		      return newState;
		default: 
			return state;
	}
}
