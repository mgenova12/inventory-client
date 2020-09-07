// import actionTypes from "../actionTypes";
import axios from "axios";
import updateFinalInventoryOrderMutation from '../mutations/inventories/updateFinalInventoryOrder';
import { print } from 'graphql';

export function updateFinalInventoryOrder(orderId, storeOrderId) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(updateFinalInventoryOrderMutation),
      variables: {
        orderId: parseInt(orderId),
        storeOrderId: parseInt(storeOrderId)
      },
    }).then((result) => {
          // dispatch({
          //   type: actionTypes.UPDATE_SCANNED,
          //   payload: result.data.data
          // })       
    });
    
  }
}