import actionTypes from "../actionTypes";
import axios from "axios";
import getInventoryOrderQuery from '../queries/orders/getInventoryOrder';
import { print } from 'graphql';

export function getInventoryOrder(storeId, orderId) {
  return async (dispatch, getState) => {
    await axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(getInventoryOrderQuery),
      variables: {
        storeId: parseInt(storeId),
        orderId: parseInt(orderId),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_INVENTORY_ORDER,
            payload: result.data.data
          })       
    });
    
  }
}