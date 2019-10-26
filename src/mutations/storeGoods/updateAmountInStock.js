import gql from 'graphql-tag';

export default gql`
  mutation updateAmountInStock($id: Int!, $amountInStock: Int!) {
    updateAmountInStock(input: { id: $id, amountInStock: $amountInStock }) {
      storeGood {
        id
        product{
          id
          name
        }
        location {
          id
          name
        }
        distributor {
          id
          name
        }
        countBy {
          id
          name
        }        
        maxAmount
        replenishBy
        deliveryDay
        amountInStock
      }
    }
  }
`;