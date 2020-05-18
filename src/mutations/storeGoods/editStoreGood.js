import gql from 'graphql-tag';

export default gql`
  mutation editStoreGood(
    $id: Int!,
	  $location: String!, 
	  $distributor: String!, 
	  $maxAmount: Int!, 
	  $countBy: String!, 
    $replenishBy: String!,
    $deliveryDay: String!,
    $amountInStock: Int
  ) {
    editStoreGood(input: { 
      id: $id,
    	location: $location, 
    	distributor: $distributor,
    	maxAmount: $maxAmount,
    	countBy: $countBy,
      replenishBy: $replenishBy,
      deliveryDay: $deliveryDay,
      amountInStock: $amountInStock
    }) {
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
      errors
    }
  }
`;