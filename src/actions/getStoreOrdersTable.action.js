import actionTypes from "../actionTypes";
import axios from "axios";
import getStoreOrdersTableQuery from '../queries/orders/getStoreOrdersTable';
import { print } from 'graphql';

export function getStoreOrders() {
  return async (dispatch, getState) => {
    await axios({
      url: `${process.env.REACT_APP_API_URL}graphql`,
      method: 'post',
      data: {
        query: print(getStoreOrdersTableQuery)
      }
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_STORE_ORDERS,
            payload: result.data.data
          })       
    });
    
  }
}