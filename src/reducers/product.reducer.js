import actionTypes from '../actionTypes';

const initialState = {
  products: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_PRODUCTS:
		      newState.products = payload.products;
		      return newState;
		default: 
			return state;
	}
}
