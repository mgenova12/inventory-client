import actionTypes from "../actionTypes";
import axios from "axios";
import editDistributorMutation from '../mutations/distributors/editDistributor';
import { print } from 'graphql';

export function editDistributor(id, name) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(editDistributorMutation),
      variables: {
        id: parseInt(id),
        name: name
      },
    }).then((result) => {
          dispatch({
            type: actionTypes.EDIT_DISTRIBUTOR,
            payload: result.data.data
          })       
    });
    
  }
}