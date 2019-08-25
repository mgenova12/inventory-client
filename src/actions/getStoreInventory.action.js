import actionTypes from "../actionTypes";
import axios from "axios";
import getStoreInventoryQuery from '../queries/inventories/getStoreInventory';
import { print } from 'graphql';

export function getStoreInventory(storeId) {
  return async (dispatch, getState) => {
    await axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(getStoreInventoryQuery),
      variables: {
        storeId: parseInt(storeId),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_STORE_INVENTORY,
            payload: result.data.data
          })       
    });
    
  }
}
