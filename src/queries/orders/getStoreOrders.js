import gql from 'graphql-tag';

export default gql`
  query storeOrders($storeId: Int!) {   
    storeOrders(storeId: $storeId) {
			id
			status
	    createdAt
	    deliveryDay
	    store{
	    	id
	      name
	    }
    }

  }
`;