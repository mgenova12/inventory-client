import actionTypes from "../actionTypes";
import axios from "axios";
import getStoreOrdersQuery from '../queries/orders/getStoreOrders';
import { print } from 'graphql';

export function getStoreOrders() {
  return async (dispatch, getState) => {
    await axios({
      url: `${process.env.REACT_APP_API_URL}graphql`,
      method: 'post',
      data: {
        query: print(getStoreOrdersQuery)
      }
    }).then((result) => {
          console.log(result)
          dispatch({
            type: actionTypes.GET_STORE_ORDERS,
            payload: result.data.data
          })       
    });
    
  }
}