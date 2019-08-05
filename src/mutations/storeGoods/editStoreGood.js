import gql from 'graphql-tag';

export default gql`
  mutation editStoreGood(
    $id: Int!,
	  $location: String!, 
	  $distributor: String!, 
	  $maxAmount: Int!, 
	  $countBy: String!, 
    $replenishByEach: Boolean!,
    $deliveryDay: String!,
  ) {
    editStoreGood(input: { 
      id: $id,
    	location: $location, 
    	distributor: $distributor,
    	maxAmount: $maxAmount,
    	countBy: $countBy,
      replenishByEach: $replenishByEach,
      deliveryDay: $deliveryDay,
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
        replenishByEach
        deliveryDay
      }
      errors
    }
  }
`;