// import actionTypes from "../actionTypes";
import axios from "axios";
import addInventoryMutation from '../mutations/inventories/addInventory';
import { print } from 'graphql';

export function addInventory(storeId, deliveryDay) {
  return async (dispatch, getState) => {
    await axios.post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(addInventoryMutation),
      variables: {
        storeId: parseInt(storeId),
        deliveryDay: deliveryDay
      },
    }).then((result) => {
        // dispatch({
        //   type: actionTypes.ADD_INVENTORY,
        //   payload: result.data.data
        // })       
    });    

    
  }
}