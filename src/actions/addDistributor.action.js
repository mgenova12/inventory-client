import actionTypes from "../actionTypes";
import axios from "axios";
import addDistributorMutation from '../mutations/distributors/addDistributor';
import { print } from 'graphql';

export function addDistributor(name) {
  return async (dispatch, getState) => {
    await axios.post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(addDistributorMutation),
      variables: {
        name: name,
      },
    }).then((result) => {
        dispatch({
          type: actionTypes.ADD_DISTRIBUTOR,
          payload: result.data.data
        })       
    });    

    
  }
}
