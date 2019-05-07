import actionTypes from '../actionTypes';

const initialState = {
  categories: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_CATEGORIES:
		      newState.categories = payload.categories;
		      return newState;
		default: 
			return state;
	}
}

