// import actionTypes from "../actionTypes";
import axios from "axios";
import editInventoryMutation from '../mutations/inventories/editInventory';
import { print } from 'graphql';

export function editInventory(id, quantity) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(editInventoryMutation),
      variables: {
        id: parseInt(id),
        quantity: parseInt(quantity)
      },
    }).then((result) => {
          // console.log(result)
          // dispatch({
          //   type: actionTypes.EDIT_INVENTORY,
          //   payload: result.data.data
          // })       
    });
    
  }
}