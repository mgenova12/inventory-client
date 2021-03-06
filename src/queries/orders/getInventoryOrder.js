import gql from 'graphql-tag';

export default gql`
  query getInventoryOrder($storeId: Int!, $orderId: Int!,) {   
    getInventoryOrder(storeId: $storeId, orderId: $orderId) {
			id
	    quantity
	    quantityNeeded
	    invoicedQuantity
	    scanned
	    reasonCode
			storeGood{
	      id
	      containerTypeId
	      containerType{
	      	id
	      	name
	      }
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
	        barcode
	        price
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