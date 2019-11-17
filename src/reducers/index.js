import { combineReducers } from "redux";

import productReducer from './product.reducer'
import containerTypeReducer from './containerType.reducer'
import storeReducer from './store.reducer'
import storeTypesReducer from './storeType.reducer'
import countByReducer from './countBy.reducer'
import categoryReducer from './category.reducer'
import distributorReducer from './distributor.reducer'
import locationReducer from './location.reducer'
import storeGoodsReducer from './storeGoods.reducer'
import inventoryReducer from './inventory.reducer'
import orderReducer from './order.reducer'
import errorReducer from './error.reducer'



const rootReducer = combineReducers({
	containerTypeReducer,
	productReducer,
	storeReducer,
	storeTypesReducer,
	countByReducer,
	categoryReducer,
	distributorReducer,
	locationReducer,
	storeGoodsReducer,
	inventoryReducer,
	orderReducer,
	errorReducer
});

export default rootReducer;