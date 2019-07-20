import actionTypes from "../actionTypes";
import axios from "axios";
import deleteLocationMutation from '../mutations/locations/deleteLocation';
import { print } from 'graphql';

export function deleteLocation(id) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(deleteLocationMutation),
      variables: {
        id: parseInt(id),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.DELETE_LOCATION,
            payload: id
          })       
    });
    
  }
}