import actionTypes from "../actionTypes";
import axios from "axios";
import editPreppedProductMutation from '../mutations/products/editPreppedProduct';
import { print } from 'graphql';

export function editPreppedProduct(id, name, category, markUp, caseQuantity, portionSize) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(editPreppedProductMutation),
      variables: {
        id: parseInt(id),
        name: name,
        category: category,
        markUp: parseInt(markUp),
        caseQuantity: parseInt(caseQuantity),
        portionSize: parseInt(portionSize)
      },
    })
    .then((result) => {
        console.log(result.data.data)
        dispatch({
          type: actionTypes.EDIT_PREPPED_PRODUCT,
          payload: result.data.data
        })       
    }).catch(err => console.log(err));  
    
  }
}