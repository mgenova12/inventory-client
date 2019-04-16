import { combineReducers } from "redux";

const intialState = {
	count: 0
}

function reducer(state=intialState, action) {
	console.log('reducer', state, action)
	return state
}

const rootReducer = combineReducers({
	reducer
});

export default rootReducer;