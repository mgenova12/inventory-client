import actionTypes from "../actionTypes";
import axios from "axios";
import getStoreOrdersQuery from '../queries/orders/getStoreOrders';
import { print } from 'graphql';

export function getStoreOrders(storeId) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(getStoreOrdersQuery),
      variables: {
        storeId: parseInt(storeId),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_STORE_ORDERS,
            payload: result.data.data
          })       
    });
    
  }
}