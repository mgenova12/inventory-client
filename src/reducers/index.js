import { combineReducers } from "redux";

import productReducer from './product.reducer'
import storeReducer from './store.reducer'
import storeTypesReducer from './storeType.reducer'
import countByReducer from './countBy.reducer'
import categoryReducer from './category.reducer'
import distributorReducer from './distributor.reducer'


const rootReducer = combineReducers({
	productReducer,
	storeReducer,
	storeTypesReducer,
	countByReducer,
	categoryReducer,
	distributorReducer
});

export default rootReducer;