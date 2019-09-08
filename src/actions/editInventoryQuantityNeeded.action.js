import axios from "axios";
import editInventoryQuantityNeededMutation from '../mutations/inventories/editInventoryQuantityNeeded';
import { print } from 'graphql';

export function editInventoryQuantityNeeded(storeId) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(editInventoryQuantityNeededMutation),
      variables: {
        storeId: parseInt(storeId)
      },
    }).then((result) => {
          // console.log(result)
          // dispatch({
          //   type: actionTypes.EDIT_INVENTORY,
          //   payload: result.data.data
          // })       
    });
    
  }
}