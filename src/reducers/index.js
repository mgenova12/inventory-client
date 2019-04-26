import { combineReducers } from "redux";

import getApi from './get-api-example.reducer'
import getProducts from './product.reducer'


const rootReducer = combineReducers({
	getApi,
	getProducts
});

export default rootReducer;