import gql from 'graphql-tag';

export default gql`
  mutation deleteInventory($storeId: Int!) {
    deleteInventory(input: { storeId: $storeId }) {
    	errors
    }
  }
`;
