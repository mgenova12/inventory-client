import { combineReducers } from "redux";

import productReducer from './product.reducer'
import storeReducer from './store.reducer'
import storeTypesReducer from './storeType.reducer'


const rootReducer = combineReducers({
	productReducer,
	storeReducer,
	storeTypesReducer
});

export default rootReducer;