import actionTypes from "../actionTypes";
import axios from "axios";
import editProductMutation from '../mutations/products/editProduct';
import { print } from 'graphql';

export function editProduct(id, name, distributor, category, price, markUp, caseQuantity, prepped, markedUpPrice) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(editProductMutation),
      variables: {
        id: parseInt(id),
        name: name,
        distributor: distributor,
        category: category,
        price: parseFloat(price),
        markUp: parseInt(markUp),
        caseQuantity: parseInt(caseQuantity),
        prepped: prepped,
        markedUpPrice: parseFloat(markedUpPrice)
      },
    })
    .then((result) => {
        dispatch({
          type: actionTypes.EDIT_PRODUCT,
          payload: result.data.data
        })       
    });  
    
  }
}