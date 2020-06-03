import gql from 'graphql-tag';

export default gql`
  query getInventory($storeId: Int!) {   
    getInventory(storeId: $storeId) {
			id
			name
	    inventories{
	      id
				quantity
				status
				storeGood{
	        id
	        product{
	          id
	          name
	          caseQuantity
	        }
	        countBy{
	          id
	          name
	        }
	      }
	    }
    }

  }
`;