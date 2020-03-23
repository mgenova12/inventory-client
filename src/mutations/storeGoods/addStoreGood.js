import gql from 'graphql-tag';

export default gql`
  mutation createStoreGood(
  	$storeId: Int!, 
  	$productId: Int!, 
  	$locationId: Int!, 
  	$distributorId: Int!,
  	$maxAmount: Int!, 
  	$replenishBy: String!,
  	$deliveryDay: String!,
    $countById: Int!,
    $containerTypeId: Int!
  ) {
    createStoreGood(input: { 
    	storeId: $storeId, 
    	productId: $productId,
    	locationId: $locationId,
    	distributorId: $distributorId,
    	maxAmount: $maxAmount,
    	replenishBy: $replenishBy,
    	deliveryDay: $deliveryDay,
      countById: $countById,
      containerTypeId: $containerTypeId
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
        replenishBy
        deliveryDay
        containerType {
          id
          name
        }
      }
    }
  }
`;
