import axios from "axios";
import actionTypes from "../actionTypes";
import { print } from 'graphql';
import editProductMutation from '../mutations/products/editProduct';


export function editProduct(id, name, distributor, category, price, markUp, caseQuantity, prepped, description, unitSize, brand, distributorNumber, barcode) {
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
        description: description || null,
        unitSize: unitSize || null,
        brand: brand || null,
        distributorNumber: distributorNumber || null,
        barcode: parseInt(barcode) || null
      },
    })
    .then((result) => {
      console.log(result.data)
        dispatch({
          type: actionTypes.EDIT_PRODUCT,
          payload: result.data.data
        })       
    });  
    
  }
}