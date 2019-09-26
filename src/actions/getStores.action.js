import actionTypes from "../actionTypes";
import axios from "axios";
import getStoresQuery from '../queries/storeTypes/getStores';
import { print } from 'graphql';

export function getStores() {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(getStoresQuery),
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_STORES,
            payload: result.data.data
          })       
    });
    
  }
}
