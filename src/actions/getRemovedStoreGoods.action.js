import actionTypes from "../actionTypes";
import axios from "axios";
import getRemovedStoreGoodsQuery from '../queries/storeGoods/getRemovedStoreGoods';
import { print } from 'graphql';

export function getRemovedStoreGoods(id) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(getRemovedStoreGoodsQuery),
      variables: {
        id: parseInt(id),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_REMOVED_STORE_GOODS,
            payload: result.data.data
          })       
    });
    
  }
}
