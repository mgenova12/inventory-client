// import actionTypes from "../actionTypes";
import axios from "axios";
import addStoreMutation from '../mutations/stores/addStore';
import { print } from 'graphql';

export function addStore(name, storeTypeId, history) {
  return async (dispatch, getState) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}graphql`, {
      query: print(addStoreMutation),
      variables: {
        name: name,
        storeTypeId: storeTypeId
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
