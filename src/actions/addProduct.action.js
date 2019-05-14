// import actionTypes from "../actionTypes";
import axios from "axios";
import addProductMutation from '../mutations/products/addProduct';
import { print } from 'graphql';

export function addProduct(name, distributorId, categoryId, countById, price, markUp, caseQuantity, prepped) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(addProductMutation),
      variables: {
        name: name,
        distributorId: parseInt(distributorId),
        categoryId: parseInt(categoryId),
        countById: parseInt(countById),
        price: parseFloat(price),
        markUp: parseInt(markUp),
        caseQuantity: parseInt(caseQuantity),
        prepped: prepped,
      },
    })
    // .then((result) => {
    //   if (result.data.errors) {
    //       dispatch({
    //         type: actionTypes.FORM_ERRORS,
    //         payload: result.data
    //       })       
    //   }
    // });  
    
  }
}