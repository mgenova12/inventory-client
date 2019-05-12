import actionTypes from "../actionTypes";
import axios from "axios";
import getDistributorsQuery from '../queries/distributors/getDistributors';
import { print } from 'graphql';

export function getDistributors() {
  return async (dispatch, getState) => {
    await axios({
      url: `${process.env.REACT_APP_API_URL}graphql`,
      method: 'post',
      data: {
        query: print(getDistributorsQuery)
      }
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_DISTRIBUTORS,
            payload: result.data.data
          })       
    });
    
  }
}