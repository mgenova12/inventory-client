import gql from 'graphql-tag';

export default gql`
  query getStoreInventory($storeId: Int!) {   
    getStoreInventory(storeId: $storeId) {
			id
	    deliveryDay
	    inventories{
	      id
	    }
    }

  }
`;