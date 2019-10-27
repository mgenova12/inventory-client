// import actionTypes from "../actionTypes";
import axios from "axios";
import deleteInventoryMutation from '../mutations/inventories/deleteInventory';
import { print } from 'graphql';

export function deleteInventory(storeId) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(deleteInventoryMutation),
      variables: {
        storeId: parseInt(storeId),
      },
    }).then((result) => {
        console.log(result)
          // dispatch({
          //   type: actionTypes.DELETE_LOCATION,
          //   payload: id
          // })       
    });
    
  }
}