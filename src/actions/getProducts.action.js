import actionTypes from "../actionTypes";
import axios from "axios";
// import getProductsQuery from '../queries/products/getProducts';
// import gql from 'graphql-tag';

// import { ApolloClient } from 'apollo-boost';
// import { createHttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory';

// `${process.env.REACT_APP_API_URL}graphql`

export function getProducts() {
  return async (dispatch, getState) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}graphql`,
      method: 'post',
      data: {
      query: `
        query {
          products {
            id
            name
            distributor {
              id
              name
            }
            measurement {
              id
              name
            }
          }
        }
        `
      }
    }).then((result) => {
          console.log(result.data.data.products)
          dispatch({
            type: actionTypes.GET_PRODUCTS,
            payload: result.data.data
          })       
    });
    
    // const data = await request.data.data.products;

    // console.log(request)

  //   dispatch({
  //     type: actionTypes.GET_PRODUCTS,
  //     payload: result
  //   })
  // }
  }
}


// const client = new ApolloClient({
//   link: new createHttpLink({
//     uri: `${process.env.REACT_APP_API_URL}graphql`,
//   }),
//   cache: new InMemoryCache(),
// })

//   console.log('client')
//   console.log(client)

//   return async (dispatch, getState) => {
//     console.log('start request')
//     const request = client.query({
//       query: gql`
//         {
//           products {
//             id
//             name
//           }
//         }
//       `
// }).then(response => console.log(response.data.allLinks))

//     console.log('request')
//     console.log(request)

//     const result = await request.data;
//     dispatch({
//       type: actionTypes.GET_PRODUCTS,
//       payload: result
//     })
//   }
// }



// export function getProducts() {
// 	return {
// 		type: actionTypes.GET_PRODUCTS,
// 		payload: {
// 			products: 'REDUX IS WORKING'
// 		}
// 	}
// }