import actionTypes from "../actionTypes";
import axios from "axios";
import editStoreGoodMutation from '../mutations/storeGoods/editStoreGood';
import { print } from 'graphql';

export function editStoreGood(id, location, distributor, countBy, maxAmount, replenishBy, deliveryDay, amountInStock) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(editStoreGoodMutation),
      variables: {
        id: parseInt(id),
        location: location,
        distributor: distributor,
        countBy: countBy,
        maxAmount: parseInt(maxAmount),
        replenishBy: replenishBy,
        deliveryDay: deliveryDay,
        amountInStock: parseInt(amountInStock)
      },
    }).then((result) => {
        dispatch({
          type: actionTypes.EDIT_STORE_GOOD,
          payload: result.data.data
        })       
    }).catch(err => console.log(err))
    
  }
}