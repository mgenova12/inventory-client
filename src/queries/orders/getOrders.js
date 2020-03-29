import gql from 'graphql-tag';

export default gql`
  query orders($storeId: Int) {   
    orders(storeId: $storeId) {
			id
			storeId
			status
	    createdAt
	    deliveryDay
	    saleTotal
	    store{
	    	id
	      name
	    }
    }

  }
`;