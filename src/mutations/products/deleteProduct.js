import gql from 'graphql-tag';

export default gql`
  mutation deleteProduct($id: Int!) {
    deleteProduct(input: { id: $id }) {
    	errors
    }
  }
`;