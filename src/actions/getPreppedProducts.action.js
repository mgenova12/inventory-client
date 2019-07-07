import actionTypes from "../actionTypes";
import axios from "axios";
import getPreppedProductsQuery from '../queries/products/getPreppedProducts';
import { print } from 'graphql';

export function getPreppedProducts() {
  return async (dispatch, getState) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}graphql`,
      method: 'post',
      data: {
        query: print(getPreppedProductsQuery)
      }
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_PREPPED_PRODUCTS,
            payload: result.data.data
          })       
    });
    
  }
}
