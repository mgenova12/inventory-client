import actionTypes from "../actionTypes";
import getProductsQuery from '../queries/products/getProducts';

import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from 'apollo-cache-inmemory';

export function getProducts() {
  return async (dispatch, getState) => {

  const customFetch = (uri, options) => {
    return fetch(uri, options)
    .then(response => {
      if (response.status >= 500) {  // or handle 400 errors
        return Promise.reject(response.status);
      }
      return response;
    });
  };

  const client = new ApolloClient({
    link: createHttpLink({
      uri: `${process.env.REACT_APP_API_URL}graphql`,
      fetch: customFetch,
    }),
    cache: new InMemoryCache()
  });



    // const cache = new InMemoryCache();
    // const client = new ApolloClient({
    //   cache,
    //   link: new HttpLink({
    //     uri: `${process.env.REACT_APP_API_URL}graphql`,
    //   }),
    // });


    const request = await client.query({
      query: getProductsQuery,
    });

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