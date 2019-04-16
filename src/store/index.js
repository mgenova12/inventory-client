import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const allStoreEnhancers = compose( 
	applyMiddleware(thunk),	
	window.devToolsExtension && window.devToolsExtension()
);

//check if production?

const store = createStore(
	rootReducer,
	allStoreEnhancers
)

export default store;