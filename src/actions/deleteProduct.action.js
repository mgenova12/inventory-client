import actionTypes from "../actionTypes";
import axios from "axios";
import deleteProductMutation from '../mutations/products/deleteProduct';
import { print } from 'graphql';

export function deleteProduct(id) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(deleteProductMutation),
      variables: {
        id: parseInt(id),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.DELETE_PRODUCT,
            payload: id
          })       
    });
    
  }
}