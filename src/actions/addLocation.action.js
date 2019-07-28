import actionTypes from "../actionTypes";
import axios from "axios";
import addLocationMutation from '../mutations/locations/addLocation';
import { print } from 'graphql';

export function addLocation(name, storeId) {
  return async (dispatch, getState) => {
    await axios.post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(addLocationMutation),
      variables: {
        name: name,
        storeId: storeId
      },
    }).then((result) => {
        dispatch({
          type: actionTypes.ADD_LOCATION,
          payload: result.data.data
        })       
    });    

    
  }
}