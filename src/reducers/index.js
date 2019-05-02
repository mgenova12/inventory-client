import { combineReducers } from "redux";

import getProducts from './product.reducer'


const rootReducer = combineReducers({
	getProducts
});

export default rootReducer;