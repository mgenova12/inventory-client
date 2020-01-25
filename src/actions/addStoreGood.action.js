import actionTypes from "../actionTypes";
import axios from "axios";
import addStoreGoodMutation from '../mutations/storeGoods/addStoreGood';
import { print } from 'graphql';

export function addStoreGood(storeId, productId, locationId, distributorId, countById, maxAmount, replenishBy, deliveryDay, containerTypeId) {
  return async (dispatch, getState) => {
    await axios.post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(addStoreGoodMutation),
      variables: {
        storeId: parseInt(storeId),
        productId: parseInt(productId),
        locationId: parseInt(locationId),
        distributorId: parseInt(distributorId),
        countById: parseInt(countById),
        maxAmount: parseInt(maxAmount),
        replenishBy: replenishBy,
        deliveryDay: deliveryDay, 
        containerTypeId: parseInt(containerTypeId)
      },
    }).then((result) => {
        console.log(result)
        dispatch({
          type: actionTypes.ADD_STORE_GOOD,
          payload: result.data.data
        })       
    }).catch(err => console.log(err))  
  }
}