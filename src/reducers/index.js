import { combineReducers } from "redux";

// const intialState = {
// 	count: 0
// }

// function reducer(state=intialState, action) {
// 	console.log('reducer', state, action)
// 	return state
// }
import getApi from './get-api-example.reducer'


const rootReducer = combineReducers({
	getApi
});

export default rootReducer;