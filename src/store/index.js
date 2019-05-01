import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const allStoreEnhancers = compose( 
	applyMiddleware(thunk),	
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//check if production?

const store = createStore(
	rootReducer,
	allStoreEnhancers
)


// const middleware = applyMiddleware(thunk);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
// 	rootReducer,
// 	composeEnhancers(middleware)
// )


export default store;