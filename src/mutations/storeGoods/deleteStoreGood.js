import gql from 'graphql-tag';

export default gql`
  mutation deleteStoreGood($id: Int!) {
    deleteStoreGood(input: { id: $id }) {
    	errors
    }
  }
`;