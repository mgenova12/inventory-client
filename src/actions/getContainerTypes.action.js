import actionTypes from "../actionTypes";
import axios from "axios";
import getContainerTypesQuery from '../queries/containerTypes/getContainerTypes';
import { print } from 'graphql';

export function getContainerTypes() {
  return async (dispatch, getState) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}graphql`,
      method: 'post',
      data: {
        query: print(getContainerTypesQuery)
      }
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_CONTAINER_TYPE,
            payload: result.data.data
          })       
    });
  }
}