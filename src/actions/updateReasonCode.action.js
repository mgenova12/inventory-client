// import actionTypes from "../actionTypes";
import axios from "axios";
import updateReasonCodeMutation from '../mutations/inventories/updateReasonCode';
import { print } from 'graphql';

export function updateReasonCode(id, reasonCode) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(updateReasonCodeMutation),
      variables: {
        id: parseInt(id),
        reasonCode: reasonCode
      },
    }).then((result) => {
        // console.log(result.data.data)
          // dispatch({
          //   type: actionTypes.UPDATE_SCANNED,
          //   payload: result.data.data
          // })       
    });
    
  }
}