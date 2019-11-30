import gql from 'graphql-tag';

export default gql`
  query getInventoryOrder($storeId: Int!, $orderId: Int!,) {   
    getInventoryOrder(storeId: $storeId, orderId: $orderId) {
			id
	    quantity
	    quantityNeeded
			storeGood{
	      id
	      replenishBy
	      countBy{
	        id
	        name
	      }
	      product {
	        id
	        name
	        caseQuantity
	        aisleNumber
	        category {
	        	id
	        	name
	        }
	      }
	      distributor {
	      	id
	      	name
	      }
	    }
    }

  }
`;