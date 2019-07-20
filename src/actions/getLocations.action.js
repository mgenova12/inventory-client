import actionTypes from "../actionTypes";
import axios from "axios";
import getLocationsQuery from '../queries/locations/getLocations';
import { print } from 'graphql';

export function getLocations(storeId) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(getLocationsQuery),
      variables: {
        storeId: parseInt(storeId),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_LOCATIONS,
            payload: result.data.data
          })       
    });
    
  }
}
