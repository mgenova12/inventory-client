import gql from 'graphql-tag';

export default gql`
  mutation createStoreGood(
  	$storeId: Int!, 
  	$productId: Int!, 
  	$locationId: Int!, 
  	$distributorId: Int!,
  	$maxAmount: Int!, 
  	$replenishByEach: Boolean!,
  	$deliveryDay: String!,
    $countById: Int! 
  ) {
    createStoreGood(input: { 
    	storeId: $storeId, 
    	productId: $productId,
    	locationId: $locationId,
    	distributorId: $distributorId,
    	maxAmount: $maxAmount,
    	replenishByEach: $replenishByEach,
    	deliveryDay: $deliveryDay,
      countById: $countById
    }) {
			storeGood {
        id
        store {
          id
          name
        }
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
    }
  }
`;
