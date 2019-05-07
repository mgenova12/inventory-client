import actionTypes from "../actionTypes";
import axios from "axios";
import getCategoriesQuery from '../queries/categories/getCategories';
import { print } from 'graphql';

export function getCategories() {
  return async (dispatch, getState) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}graphql`,
      method: 'post',
      data: {
        query: print(getCategoriesQuery)
      }
    }).then((result) => {
          dispatch({
            type: actionTypes.GET_CATEGORIES,
            payload: result.data.data
          })       
    });
    
  }
}