import actionTypes from "../actionTypes";
import axios from "axios";
import getStoreTypesQuery from '../queries/storeTypes/getStoreTypes';
import { print } from 'graphql';

export function getStoreTypes() {
  return async (dispatch, getState) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}graphql`,
      method: 'post',
      data: {
        query: print(getStoreTypesQuery)
      }
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_STORE_TYPES,
            payload: result.data.data
          })    
    });
    
  }
}