import gql from 'graphql-tag';

export default gql`
  mutation updateReasonCode($id: Int!, $reasonCode: String!) {
    updateReasonCode(input: {id: $id, reasonCode: $reasonCode}) {
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