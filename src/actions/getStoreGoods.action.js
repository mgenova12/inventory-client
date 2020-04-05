import actionTypes from "../actionTypes";
import axios from "axios";
import getStoreGoodsQuery from '../queries/storeGoods/getStoreGoods';
import { print } from 'graphql';


export function getStoreGoods(id) {
  return async (dispatch, getState) => {
    await axios({
      url: `${process.env.REACT_APP_API_URL}graphql`,
      method: 'post',
      data: {
        query: print(getStoreGoodsQuery),
        variables: {
          id: parseInt(id),
        },              
      },

    }).then((result) => {
          dispatch({
            type: actionTypes.GET_STORE_GOODS,
            payload: result.data.data
          })       
    });
    
  }
}