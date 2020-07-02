import actionTypes from "../actionTypes";
import axios from "axios";
import getCombindedQuery from '../queries/orders/getCombinded';
import { print } from 'graphql';

export function getCombinded(storeOrderId, storeId) {
  return async (dispatch, getState) => {
    await axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(getCombindedQuery),
      variables: {
        storeOrderId: parseInt(storeOrderId),
        storeId: parseInt(storeId),
      },
    }).then((result) => {
          console.log(result.data.data)
          dispatch({
            type: actionTypes.GET_COMBINDED,
            payload: result.data.data
          })       
    });
    
  }
}