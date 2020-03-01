import gql from 'graphql-tag';

export default gql`
  mutation updateScanned($barcode: Int!, $storeId: Int!, $orderId: Int!) {
    updateScanned(input: {barcode: $barcode, storeId: $storeId, orderId: $orderId }) {
    	inventory {
				id
		    quantity
		    quantityNeeded
		    scanned
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

  }
`;