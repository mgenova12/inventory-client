import actionTypes from '../actionTypes';

const initialState = {
  orders: [],
  inventoryOrder: []
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		case actionTypes.GET_ORDERS:
		      newState.orders = payload.orders;
		      return newState;
		case actionTypes.GET_STORE_ORDERS:
		      newState.orders = payload.storeOrders;
		      return newState;		      
		case actionTypes.GET_INVENTORY_ORDER:
		      newState.inventoryOrder = payload.getInventoryOrder;
		      return newState;		      
		default: 
			return state;
	}
}