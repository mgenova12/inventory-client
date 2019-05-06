// import actionTypes from "../actionTypes";
import axios from "axios";
import addDistributorMutation from '../mutations/distributors/addDistributor';
import { print } from 'graphql';

export function addDistributor(name, history) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(addDistributorMutation),
      variables: {
        name: name,
      },
    })
    .then(() => history.push("/"))
    // .catch(err => console.log(err))    


    // .then((result) => {
    //       dispatch({
    //         type: actionTypes.ADD_STORE,
    //         payload: 'result.data.data'
    //       })       
    // });
    
  }
}
