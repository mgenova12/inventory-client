// import fetch from 'isomorphic-fetch'
// import runtimeEnv from '@mars/heroku-js-runtime-env'

import actionTypes from "../actionTypes";

export function getApi() {
	return {
		type: actionTypes.GET_API,
		payload: {
			message: 'REDUX IS WORKING'
		}
	}
}