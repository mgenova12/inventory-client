import actionTypes from "../actionTypes";
import axios from "axios";
// import getProductsQuery from '../queries/products/getProducts';
import { print } from 'graphql';

export function addStore() {
  return async (dispatch, getState) => {
    // axios({
    //   url: `${process.env.REACT_APP_API_URL}graphql`,
    //   method: 'post',
    //   data: {
    //     query: print(getProductsQuery)
    //   }
    // }).then((result) => {
    //       dispatch({
    //         type: actionTypes.ADD_STORE,
    //         payload: result.data.data
    //       })       
    // });
    
  }
}
