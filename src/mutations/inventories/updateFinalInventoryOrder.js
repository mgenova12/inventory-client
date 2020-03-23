import gql from 'graphql-tag';

export default gql`
  mutation updateFinalInventoryOrder($orderId: Int!, $storeOrderId: Int!) {
    updateFinalInventoryOrder(input: { orderId: $orderId, storeOrderId: $storeOrderId }) {
      errors
    }
  }
`;
