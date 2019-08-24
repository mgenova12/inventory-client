import gql from 'graphql-tag';

export default gql`
  query getInventory($storeId: Int!) {   
    getInventory(storeId: $storeId) {
			id
			name
	    inventories{
	      id
				storeGood{
	        id
	        product{
	          id
	          name
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