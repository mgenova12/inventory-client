import actionTypes from "../actionTypes";
import getProductsQuery from '../queries/products/getProducts';

import ApolloClient from 'apollo-boost';

export function getProducts() {
  return async (dispatch, getState) => {
  	
    const client = new ApolloClient({
  		uri: `${process.env.REACT_APP_API_URL}graphql`
	  });
    console.log(client)

    const request = await client.query({
      query: getProductsQuery,
    });
    console.log(request)

    const result = await request.data;

    console.log(result)

    dispatch({
      type: actionTypes.GET_PRODUCTS,
      payload: result
    })
  }
}



// export function getProducts() {
// 	return {
// 		type: actionTypes.GET_PRODUCTS,
// 		payload: {
// 			products: 'REDUX IS WORKING'
// 		}
// 	}
// }