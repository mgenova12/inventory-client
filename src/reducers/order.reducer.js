import actionTypes from '../actionTypes';
import update from 'immutability-helper';

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
		case actionTypes.UPDATE_SCANNED:
				let invetoryIdx = newState.inventoryOrder.findIndex(inventory => inventory.id === payload.updateScanned.inventory.id)
				return {
					inventoryOrder: update(newState.inventoryOrder, { $splice: [[invetoryIdx, 1, payload.updateScanned.inventory]] })
				}			      	      
		default: 
			return state;
	}
}