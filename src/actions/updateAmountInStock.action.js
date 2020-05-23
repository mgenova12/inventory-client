import actionTypes from "../actionTypes";
import axios from "axios";
import updateAmountInStockMutation from '../mutations/storeGoods/updateAmountInStock';
import { print } from 'graphql';

export function updateAmountInStock(id, amountInStock) {
  return async (dispatch, getState) => {
    await axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(updateAmountInStockMutation),
      variables: {
        id: parseInt(id),
        amountInStock: parseInt(amountInStock)
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.UPDATE_AMOUNT_IN_STOCK,
            payload: result.data.data
          })       
    }).catch(err => console.log(err));
    
  }
}