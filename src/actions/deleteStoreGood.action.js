import actionTypes from "../actionTypes";
import axios from "axios";
import deleteStoreGoodMutation from '../mutations/storeGoods/deleteStoreGood';
import { print } from 'graphql';

export function deleteStoreGood(id) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(deleteStoreGoodMutation),
      variables: {
        id: parseInt(id),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.DELETE_STORE_GOOD,
            payload: id
          })       
    });
    
  }
}