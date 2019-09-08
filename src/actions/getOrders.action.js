import actionTypes from "../actionTypes";
import axios from "axios";
import getOrdersQuery from '../queries/orders/getOrders';
import { print } from 'graphql';

export function getOrders(storeId) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(getOrdersQuery),
      variables: {
        storeId: parseInt(storeId),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_ORDERS,
            payload: result.data.data
          })       
    });
    
  }
}