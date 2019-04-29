import actionTypes from "../actionTypes";
import getProductsQuery from '../queries/products/getProducts';

import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";
// `${process.env.REACT_APP_API_URL}graphql`

export function getProducts() {
  
const link_errors = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

  const client = new ApolloClient({
    link: createHttpLink({ uri: `${process.env.REACT_APP_API_URL}graphql` }),
    cache: new InMemoryCache(),
    link_errors
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