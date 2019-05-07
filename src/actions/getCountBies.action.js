import actionTypes from "../actionTypes";
import axios from "axios";
import getCountBiesQuery from '../queries/countBies/getCountBies';
import { print } from 'graphql';

export function getCountBies() {
  return async (dispatch, getState) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}graphql`,
      method: 'post',
      data: {
        query: print(getCountBiesQuery)
      }
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_COUNT_BIES,
            payload: result.data.data
          })       
    });
    
  }
}