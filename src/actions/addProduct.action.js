// import actionTypes from "../actionTypes";
import axios from "axios";
import addProductMutation from '../mutations/products/addProduct';
import { print } from 'graphql';

export function addProduct(name, distributorId, categoryId, price, markUp, caseQuantity, prepped, barcode, description, distributorNumber, brand, unitSize, documentData, markedUpPrice, portionSize) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(addProductMutation),
      variables: {
        name: name,
        distributorId: parseInt(distributorId),
        categoryId: parseInt(categoryId),
        price: parseFloat(price),
        markUp: parseInt(markUp),
        caseQuantity: parseInt(caseQuantity),
        prepped: prepped,
        barcode: parseInt(barcode),
        description: description,
        distributorNumber: parseInt(distributorNumber),
        brand: brand,
        unitSize: unitSize,
        documentData: documentData,
        markedUpPrice: parseFloat(markedUpPrice),
        portionSize: parseInt(portionSize)
      },
    })
    .then((result) => {

    })
    .catch(err => console.log(err))
    
  }
}