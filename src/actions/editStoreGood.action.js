import actionTypes from "../actionTypes";
import axios from "axios";
import editStoreGoodMutation from '../mutations/storeGoods/editStoreGood';
import { print } from 'graphql';

export function editStoreGood(id, location, distributor, countBy, maxAmount, replenishByEach, deliveryDay) {
  return async (dispatch, getState) => {
    console.log(replenishByEach)
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(editStoreGoodMutation),
      variables: {
        id: parseInt(id),
        location: location,
        distributor: distributor,
        countBy: countBy,
        maxAmount: parseInt(maxAmount),
        replenishByEach: replenishByEach,
        deliveryDay: deliveryDay
      },
    }).then((result) => {
          console.log(result)
          dispatch({
            type: actionTypes.EDIT_STORE_GOOD,
            payload: result.data.data
          })       
    }).catch(err => console.log(err))
    
  }
}