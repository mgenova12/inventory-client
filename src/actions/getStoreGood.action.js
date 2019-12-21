import actionTypes from "../actionTypes";
import axios from "axios";
import getStoreGoodQuery from '../queries/storeGoods/getStoreGood';
import { print } from 'graphql';

export function getStoreGood(id) {
  return async (dispatch, getState) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}graphql`, {
        query: print(getStoreGoodQuery),
        variables: {
          id: parseInt(id),
        },
      }).then((result) => {
            dispatch({
              type: actionTypes.GET_STORE_GOOD,
              payload: result.data.data
            })       
      }).catch(err => console.log(err));
    
  }
}
