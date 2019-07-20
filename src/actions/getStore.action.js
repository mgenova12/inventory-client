import actionTypes from "../actionTypes";
import axios from "axios";
import getStoreQuery from '../queries/storeTypes/getStore';
import { print } from 'graphql';

export function getStore(id) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(getStoreQuery),
      variables: {
        id: parseInt(id),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_STORE,
            payload: result.data.data
          })       
    });
    
  }
}
