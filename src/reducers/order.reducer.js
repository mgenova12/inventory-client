import actionTypes from '../actionTypes';

const initialState = {
  orders: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_ORDERS:
		      newState.orders = payload.orders;
		      return newState;
		default: 
			return state;
	}
}