import actionTypes from '../actionTypes';

const initialState = {
  containerTypes: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_CONTAINER_TYPE:
		      newState.containerTypes = payload.containerTypes;
		      return newState;
		default: 
			return state;
	}
}

