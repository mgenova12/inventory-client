import actionTypes from "../actionTypes";
import axios from "axios";
import deleteDistributorMutation from '../mutations/distributors/deleteDistributor';
import { print } from 'graphql';

export function deleteDistributor(id) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(deleteDistributorMutation),
      variables: {
        id: parseInt(id),
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.DELETE_DISTRIBUTOR,
            payload: id
          })       
    });
    
  }
}