import actionTypes from "../actionTypes";
// import getProductsQuery from '../queries/products/getProducts';

import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';

import gql from 'graphql-tag';

const getProductsQuery = gql`
  {
    products {
      id
      name
    }
  }
`;

export function getProducts() {
    const cache = new InMemoryCache();
    const client = new ApolloClient({
      cache,
      link: new HttpLink({
        uri: `${process.env.REACT_APP_API_URL}graphql`,
      }),
    });
    console.log('client')
    console.log(client)

  return async (dispatch, getState) => {
    const request = await client.query({
      query: getProductsQuery,
    });
    
    console.log('request')
    console.log(request)

    const result = await request.data;

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