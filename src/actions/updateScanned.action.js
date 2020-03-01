import actionTypes from "../actionTypes";
import axios from "axios";
import updateScannedMutation from '../mutations/inventories/updateScanned';
import { print } from 'graphql';

export function updateScanned(barcode, storeId, orderId) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(updateScannedMutation),
      variables: {
        barcode: parseInt(barcode),
        storeId: parseInt(storeId),
        orderId: parseInt(orderId)
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.UPDATE_SCANNED,
            payload: result.data.data
          })       
    });
    
  }
}