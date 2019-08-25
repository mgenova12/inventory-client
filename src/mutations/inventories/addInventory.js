import gql from 'graphql-tag';

export default gql`
  mutation createInventory($storeId: Int!, $deliveryDay: String!) {
    createInventory(input: {storeId: $storeId, deliveryDay: $deliveryDay }) {
    	errors
    }
  }
`;