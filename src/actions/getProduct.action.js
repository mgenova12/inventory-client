import actionTypes from "../actionTypes";
import axios from "axios";
import getProductQuery from '../queries/products/getProduct';
import { print } from 'graphql';

export function getProduct(id) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(getProductQuery),
      variables: {
        id: parseInt(id),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_PRODUCT,
            payload: result.data.data
          })       
    });
    
  }
}
