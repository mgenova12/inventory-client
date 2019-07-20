import actionTypes from "../actionTypes";
import axios from "axios";
import updateLocationRowOrderMutation from '../mutations/locations/updateLocationRowOrder';
import { print } from 'graphql';

export function updateLocationRowOrder(locationIds) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(updateLocationRowOrderMutation),
      variables: {
        locationIds: locationIds
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.UPDATE_LOCATION_ROW_ORDER,
            payload: result.data.data
          })       
    });
    
  }
}