import actionTypes from "../actionTypes";
import axios from "axios";
import getInventoryQuery from '../queries/inventories/getInventory';
import { print } from 'graphql';



export function getInventory(storeId) {
  return async (dispatch, getState) => {
    let data = localStorage.getItem('data')
    
    axios.post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(getInventoryQuery),
      variables: {
        storeId: parseInt(storeId),
      },
    }).then((result) => {
          data = result.data.data
          localStorage.setItem('data', result.data.data)
          dispatch({
            type: actionTypes.GET_INVENTORY,
            payload: data
          })       
    });
    
  }
}
